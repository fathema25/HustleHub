import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYobqLrhGTXgX2j-ftQnfq9kYZL59pE8E",
  authDomain: "hustlehub-2d79f.firebaseapp.com",
  projectId: "hustlehub-2d79f",
  storageBucket: "hustlehub-2d79f.firebasestorage.app",
  messagingSenderId: "593005201622",
  appId: "1:593005201622:web:cf027c4cc54e6a0de5a177"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);