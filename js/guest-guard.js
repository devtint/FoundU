import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if (user) {

        // User is already logged in
        window.location.href = "dashboard.html";

    }

});