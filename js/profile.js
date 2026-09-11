console.log("Profile JS is running!");

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ========================================
// ELEMENTS
// ========================================

const profileAvatar = document.getElementById("profile-avatar");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");

const displayName = document.getElementById("display-name");
const displayEmail = document.getElementById("display-email");
const displayId = document.getElementById("display-id");

const editName = document.getElementById("edit-name");
const saveProfile = document.getElementById("save-profile");

const logoutButton = document.getElementById("logout-button");
const profileMessage = document.getElementById("profile-message");


// ========================================
// CURRENT USER
// ========================================

let currentUser = null;


// ========================================
// AUTHENTICATION
// ========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        console.log("No user logged in.");

        window.location.href = "login.html";

        return;
    }

    currentUser = user;

    console.log("Logged in:", user.email);
    console.log("UID:", user.uid);

    await loadProfile(user);
});


// ========================================
// LOAD PROFILE
// ========================================

async function loadProfile(user) {

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnapshot = await getDoc(userRef);

        let name = "Student";
        let studentId = "Not provided";

        if (userSnapshot.exists()) {

            const userData = userSnapshot.data();

            console.log("User profile:", userData);

            name =
                userData.name ||
                userData.displayName ||
                user.displayName ||
                "Student";

            studentId =
                userData.studentId ||
                "Not provided";

        } else {

            console.log(
                "User document does not exist. Creating profile..."
            );

            name =
                user.displayName ||
                "Student";

            await setDoc(userRef, {

                name: name,

                studentId: "",

                email: user.email || "",

                photoURL: user.photoURL || "",

                provider:
                    user.providerData?.[0]?.providerId ||
                    "password",

                createdAt: serverTimestamp()

            });

            console.log("User profile created.");
        }


        // ========================================
        // DISPLAY PROFILE
        // ========================================

        profileName.textContent = name;

        profileEmail.textContent =
            user.email || "No email";

        displayName.textContent = name;

        displayEmail.textContent =
            user.email || "No email";

        // Student ID from Firestore
        displayId.textContent = studentId;

        // Put current name into input
        editName.value = name;

        // Avatar
        profileAvatar.textContent =
            getInitial(name);


    } catch (error) {

        console.error(
            "Error loading profile:",
            error
        );

        profileMessage.textContent =
            "Failed to load profile.";
    }
}


// ========================================
// SAVE PROFILE
// ========================================

saveProfile.addEventListener(
    "click",
    async () => {

        if (!currentUser) {

            return;
        }


        const newName =
            editName.value.trim();


        // ========================================
        // VALIDATION
        // ========================================

        if (!newName) {

            profileMessage.textContent =
                "Please enter your name.";

            return;
        }


        if (newName.length < 2) {

            profileMessage.textContent =
                "Name must be at least 2 characters.";

            return;
        }


        try {

            saveProfile.disabled = true;

            saveProfile.textContent =
                "Saving...";


            // ========================================
            // FIRESTORE
            // ========================================

            const userRef =
                doc(
                    db,
                    "users",
                    currentUser.uid
                );


            // ========================================
            // CREATE OR UPDATE PROFILE
            // ========================================

            await setDoc(
                userRef,
                {
                    name: newName,

                    email:
                        currentUser.email || "",

                    photoURL:
                        currentUser.photoURL || "",

                    provider:
                        currentUser.providerData?.[0]?.providerId ||
                        "password"
                },
                {
                    merge: true
                }
            );


            // ========================================
            // UPDATE FIREBASE AUTH PROFILE
            // ========================================

            await updateProfile(
                currentUser,
                {
                    displayName: newName
                }
            );


            // ========================================
            // UPDATE SCREEN
            // ========================================

            profileName.textContent =
                newName;

            displayName.textContent =
                newName;

            editName.value =
                newName;

            profileAvatar.textContent =
                getInitial(newName);


            profileMessage.textContent =
                "Profile updated successfully!";


            console.log(
                "Profile updated:",
                newName
            );


        } catch (error) {

            console.error(
                "Update profile error:",
                error
            );

            profileMessage.textContent =
                "Failed to update profile.";

        } finally {

            saveProfile.disabled = false;

            saveProfile.textContent =
                "Save Changes";
        }
    }
);


// ========================================
// LOGOUT
// ========================================

logoutButton.addEventListener(
    "click",
    async () => {

        const confirmed =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmed) {

            return;
        }


        try {

            await signOut(auth);

            console.log(
                "User logged out."
            );

            window.location.href =
                "login.html";


        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

            profileMessage.textContent =
                "Failed to logout.";
        }
    }
);


// ========================================
// GET INITIAL
// ========================================

function getInitial(name) {

    if (!name) {

        return "?";
    }

    return name
        .charAt(0)
        .toUpperCase();
}