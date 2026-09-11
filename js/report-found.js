console.log("Report Found JS is running!");

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
// CLOUDINARY
// ========================================

const CLOUD_NAME = "ovxdiqcs";
const UPLOAD_PRESET = "foundu_uploads";


// ========================================
// ELEMENTS
// ========================================

const form =
    document.getElementById("report-found-form");

const message =
    document.getElementById("form-message");

const submitButton =
    document.querySelector(".report-submit");


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
// CLOUDINARY UPLOAD
// ========================================

async function uploadImage(file, userId) {

    console.log(
        "Uploading image to Cloudinary..."
    );

    const url =
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;


    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    formData.append(
        "upload_preset",
        UPLOAD_PRESET
    );

    formData.append(
        "folder",
        `foundu/${userId}`
    );


    const response =
        await fetch(
            url,
            {
                method: "POST",
                body: formData
            }
        );


    if (!response.ok) {

        const errorText =
            await response.text();

        console.error(
            "Cloudinary error:",
            errorText
        );

        throw new Error(
            "Image upload failed."
        );
    }


    const data =
        await response.json();


    console.log(
        "Cloudinary upload successful:",
        data
    );


    return data.secure_url;
}


// ========================================
// AUTHENTICATION
// ========================================

onAuthStateChanged(
    auth,
    (user) => {

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

    }
);


// ========================================
// SUBMIT FORM
// ========================================

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        console.log(
            "Report Found form submitted!"
        );


        // ========================================
        // CHECK LOGIN
        // ========================================

        const user =
            auth.currentUser;


        if (!user) {

            showMessage(
                t("Please login first."),
                "error"
            );

            return;
        }


        // ========================================
        // GET VALUES
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


        const foundDate =
            document
                .getElementById("found-date")
                .value;


        const photoInput =
            document.getElementById(
                "item-photo"
            );


        const photo =
            photoInput.files[0];


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !itemName ||
            !category ||
            !description ||
            !location ||
            !foundDate
        ) {

            showMessage(
                t(t("requiredField")),
                "error"
            );

            return;
        }


        // ========================================
        // IMAGE VALIDATION
        // ========================================

        if (photo) {

            if (
                !photo.type.startsWith(
                    "image/"
                )
            ) {

                showMessage(
                    t("Please select an image file."),
                    "error"
                );

                return;
            }


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

        submitButton.disabled =
            true;

        submitButton.textContent =
            t("Submitting...");


        try {

            // ========================================
            // IMAGE
            // ========================================

            let imageURL = "";


            if (photo) {

                showMessage(
                    t("Uploading image...")
                );


                imageURL =
                    await uploadImage(
                        photo,
                        user.uid
                    );

            }


            // ========================================
            // FIRESTORE DATA
            // ========================================

            showMessage(
                t("Saving found item...")
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

                foundDate:
                    foundDate,

                imageURL:
                    imageURL,

                type:
                    "found",

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
                "Saving found item:",
                itemData
            );


            // ========================================
            // SAVE
            // ========================================

            const itemRef =
                await addDoc(
                    collection(
                        db,
                        "items"
                    ),
                    itemData
                );


            console.log(
                "Found item created:",
                itemRef.id
            );


            // ========================================
            // SUCCESS
            // ========================================

            showMessage(
                t("Found item reported successfully!"),
                "success"
            );


            submitButton.textContent =
                t("Submitted ✓");


            // ========================================
            // REDIRECT
            // ========================================

            setTimeout(
                () => {

                    window.location.href =
                        "dashboard.html";

                },
                1500
            );


        } catch (error) {

            console.error(
                "❌ Report found error:",
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
                "Report Found Item";

        }

    }
);