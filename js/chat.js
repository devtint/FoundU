import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {
    collection, doc, getDoc, addDoc, setDoc, onSnapshot,
    query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const otherUserId = params.get("userId");
const itemId = params.get("itemId") || "";
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatTitle = document.getElementById("chat-title");
const chatSubtitle = document.getElementById("chat-subtitle");

let currentUser = null;
let unsubscribeMessages = null;

function makeConversationId(a, b) {
    return [a, b].sort().join("_");
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
}

function showError(message) {
    chatMessages.innerHTML = `<p class="form-message">${escapeHTML(message)}</p>`;
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    currentUser = user;

    if (!otherUserId || otherUserId === currentUser.uid) {
        showError(t("invalidChat"));
        chatForm.style.display = "none";
        return;
    }

    try {
        const otherSnap = await getDoc(doc(db, "users", otherUserId));
        const other = otherSnap.exists() ? otherSnap.data() : {};
        const otherName = other.name || t("foundUUser");

        chatTitle.textContent = otherName;
        chatSubtitle.textContent = itemId ? `${t("aboutItem")}: ${itemId}` : t("directChat");

        const conversationId = makeConversationId(currentUser.uid, otherUserId);
        const conversationRef = doc(db, "conversations", conversationId);

        await setDoc(conversationRef, {
            participants: [currentUser.uid, otherUserId],
            participantNames: {
                [currentUser.uid]: currentUser.displayName || "FoundU User",
                [otherUserId]: otherName
            },
            lastMessage: "",
            updatedAt: serverTimestamp()
        }, { merge: true });

        const messagesQuery = query(
            collection(db, "conversations", conversationId, "messages"),
            orderBy("createdAt", "asc")
        );

        unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
            chatMessages.innerHTML = "";

            if (snapshot.empty) {
                chatMessages.innerHTML = `<p class="empty-state">${escapeHTML(t("noMessages"))}</p>`;
                return;
            }

            snapshot.forEach((messageDoc) => {
                const message = messageDoc.data();
                const bubble = document.createElement("div");
                bubble.className = `chat-bubble ${message.senderId === currentUser.uid ? "mine" : "theirs"}`;
                bubble.innerHTML = `
                    <div class="chat-message-text">${escapeHTML(message.text)}</div>
                    <small>${message.senderId === currentUser.uid ? escapeHTML(t("you")) : escapeHTML(otherName)}</small>
                `;
                chatMessages.appendChild(bubble);
            });

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, (error) => {
            console.error("Message listener error:", error);
            showError(t("unableToLoadMessages"));
        });

        chatForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const text = chatInput.value.trim();
            if (!text) return;

            chatInput.disabled = true;

            try {
                await addDoc(collection(conversationRef, "messages"), {
                    senderId: currentUser.uid,
                    receiverId: otherUserId,
                    text,
                    itemId,
                    createdAt: serverTimestamp()
                });

                await setDoc(conversationRef, {
                    participants: [currentUser.uid, otherUserId],
                    lastMessage: text,
                    lastSenderId: currentUser.uid,
                    updatedAt: serverTimestamp()
                }, { merge: true });

                chatInput.value = "";
            } catch (error) {
                console.error("Send message error:", error);
                alert(t("messageSendFailed"));
            } finally {
                chatInput.disabled = false;
                chatInput.focus();
            }
        });

    } catch (error) {
        console.error("Chat setup error:", error);
        showError(t("chatSetupFailed"));
    }
});

window.addEventListener("beforeunload", () => {
    if (unsubscribeMessages) unsubscribeMessages();
});
