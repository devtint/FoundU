console.log("Report Lost JS is running!");

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ========================================
// CLOUDINARY SETTINGS
// ========================================

const CLOUD_NAME = "ovxdiqcs";
const UPLOAD_PRESET = "foundu_uploads";


// ========================================
// ELEMENTS
// ========================================

const form = document.getElementById("report-lost-form");

const message = document.getElementById("form-message");

const submitButton = document.querySelector(".report-submit");


// Check elements
console.log("Form:", form);
console.log("Message:", message);
console.log("Submit button:", submitButton);


// ========================================
// SHOW MESSAGE
// ========================================

function showMessage(text, type = "info") {

    message.textContent = text;

    message.className = "form-message";

    if (type === "success") {
        message.classList.add("success");
    }

    if (type === "error") {
        message.classList.add("error");
    }
}


// ========================================
// UPLOAD IMAGE TO CLOUDINARY
// ========================================

async function uploadImage(file, userId) {

    console.log("Starting Cloudinary upload...");
    console.log("File:", file);

    const url =
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", UPLOAD_PRESET);

    // User folder
    formData.append(
        "folder",
        `foundu/${userId}`
    );


    const response = await fetch(url, {
        method: "POST",
        body: formData
    });


    if (!response.ok) {

        const errorText = await response.text();

        console.error(
            "Cloudinary error:",
            errorText
        );

        throw new Error(
            "Image upload failed."
        );
    }


    const data = await response.json();

    console.log(
        "Cloudinary upload successful:",
        data
    );


    return data.secure_url;
}


// ========================================
// AUTHENTICATION
// ========================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        console.log(
            "No user logged in."
        );

        window.location.href =
            "login.html";

        return;
    }


    console.log(
        "Logged in:",
        user.email
    );

    console.log(
        "UID:",
        user.uid
    );

});


// ========================================
// FORM SUBMIT
// ========================================

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        console.log(
            "Report Lost form submitted!"
        );


        // ========================================
        // CHECK LOGIN
        // ========================================

        const user = auth.currentUser;

        if (!user) {

            showMessage(
                t("Please login first."),
                "error"
            );

            return;
        }


        // ========================================
        // GET FORM VALUES
        // ========================================

        const itemName =
            document
                .getElementById("item-name")
                .value
                .trim();


        const category =
            document
                .getElementById("category")
                .value;


        const description =
            document
                .getElementById("description")
                .value
                .trim();


        const location =
            document
                .getElementById("location")
                .value;


        const lostDate =
            document
                .getElementById("lost-date")
                .value;


        const photoInput =
            document.getElementById(
                "item-photo"
            );


        const photo =
            photoInput.files[0];


        console.log(
            "Item Name:",
            itemName
        );

        console.log(
            "Category:",
            category
        );

        console.log(
            "Description:",
            description
        );

        console.log(
            "Location:",
            location
        );

        console.log(
            "Lost Date:",
            lostDate
        );

        console.log(
            "Photo:",
            photo
        );


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !itemName ||
            !category ||
            !description ||
            !location ||
            !lostDate
        ) {

            showMessage(
                t("requiredField"),
                "error"
            );

            return;
        }


        // ========================================
        // IMAGE VALIDATION
        // ========================================

        if (photo) {

            // Check image type
            if (!photo.type.startsWith("image/")) {

                showMessage(
                    t("Please select an image file."),
                    "error"
                );

                return;
            }


            // Maximum 5 MB
            if (
                photo.size >
                5 * 1024 * 1024
            ) {

                showMessage(
                    t("Image must be smaller than 5 MB."),
                    "error"
                );

                return;
            }
        }


        // ========================================
        // DISABLE BUTTON
        // ========================================

        submitButton.disabled = true;

        submitButton.textContent =
            t("Submitting...");


        try {

            // ========================================
            // IMAGE URL
            // ========================================

            let imageURL = "";


            // ========================================
            // UPLOAD IMAGE
            // ========================================

            if (photo) {

                showMessage(
                    t("Uploading image...")
                );

                console.log(
                    "Uploading image to Cloudinary..."
                );


                imageURL =
                    await uploadImage(
                        photo,
                        user.uid
                    );


                console.log(
                    "Image URL:",
                    imageURL
                );

            }


            // ========================================
            // SAVE TO FIRESTORE
            // ========================================

            showMessage(
                t("Saving lost item...")
            );


            const itemData = {

                itemName:
                    itemName,

                category:
                    category,

                description:
                    description,

                location:
                    location,

                lostDate:
                    lostDate,

                imageURL:
                    imageURL,

                type:
                    "lost",

                status:
                    "active",

                userId:
                    user.uid,

                userEmail:
                    user.email,

                createdAt:
                    serverTimestamp()

            };


            console.log(
                "Saving item:",
                itemData
            );


            const itemRef =
                await addDoc(
                    collection(
                        db,
                        "items"
                    ),
                    itemData
                );


            console.log(
                "Item created successfully:",
                itemRef.id
            );


            // ========================================
            // SUCCESS
            // ========================================

            showMessage(
                t("Lost item reported successfully!"),
                "success"
            );


            submitButton.textContent =
                t("Submitted ✓");


            // ========================================
            // REDIRECT
            // ========================================

            setTimeout(() => {

                window.location.href =
                    "my-reports.html";

            }, 1500);


        } catch (error) {

            console.error(
                "❌ Report lost error:",
                error
            );


            showMessage(
                error.message ||
                t("Something went wrong. Please try again."),
                "error"
            );


            submitButton.disabled =
                false;


            submitButton.textContent =
                "Report Lost Item";

        }

    }
);