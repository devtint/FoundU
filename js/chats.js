import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {
    collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const list = document.getElementById("chat-list");

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
}

function formatTime(value) {
    if (!value || typeof value.toDate !== "function") return "";
    return value.toDate().toLocaleString();
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {
        const q = query(
            collection(db, "conversations"),
            where("participants", "array-contains", user.uid)
        );

        const snapshot = await getDocs(q);
        const conversations = [];

        snapshot.forEach((conversationDoc) => {
            const data = conversationDoc.data();
            const otherUserId = (data.participants || []).find(id => id !== user.uid);
            if (!otherUserId) return;

            conversations.push({
                id: conversationDoc.id,
                otherUserId,
                name: data.participantNames?.[otherUserId] || t("foundUUser"),
                lastMessage: data.lastMessage || t("noMessages"),
                updatedAt: data.updatedAt
            });
        });

        conversations.sort((a, b) => {
            const at = a.updatedAt?.toMillis?.() || 0;
            const bt = b.updatedAt?.toMillis?.() || 0;
            return bt - at;
        });

        list.innerHTML = "";

        if (!conversations.length) {
            list.innerHTML = `<p class="empty-state">${escapeHTML(t("noConversations"))}</p>`;
            return;
        }

        conversations.forEach(chat => {
            const link = document.createElement("a");
            link.className = "chat-list-item";
            link.href = `chat.html?userId=${encodeURIComponent(chat.otherUserId)}`;
            link.innerHTML = `
                <div class="chat-avatar">${escapeHTML(chat.name.charAt(0).toUpperCase())}</div>
                <div class="chat-list-content">
                    <strong>${escapeHTML(chat.name)}</strong>
                    <span>${escapeHTML(chat.lastMessage)}</span>
                </div>
                <small>${escapeHTML(formatTime(chat.updatedAt))}</small>
            `;
            list.appendChild(link);
        });

    } catch (error) {
        console.error("Chat list error:", error);
        list.innerHTML = `<p class="form-message">${escapeHTML(t("unableToLoadMessages"))}</p>`;
    }
});
