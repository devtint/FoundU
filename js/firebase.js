import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPPy6u_KwRnRIkiR4-7wI-TXhaeYI41Gs",
  authDomain: "foundu-app-a449c.firebaseapp.com",
  projectId: "foundu-app-a449c",
  storageBucket: "foundu-app-a449c.firebasestorage.app",
  messagingSenderId: "317657603253",
  appId: "1:317657603253:web:4e8ab51efaa2c7591d32fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

// Firebase Storage

export const storage = getStorage(app);