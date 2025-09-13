import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBQKm28nsG6VSO9O1CxnE3i14xZd3CLoJw",

  authDomain: "pharmacymobile-dccf4.firebaseapp.com",

  projectId: "pharmacymobile-dccf4",

  storageBucket: "pharmacymobile-dccf4.firebasestorage.app",

  messagingSenderId: "912461672796",

  appId: "1:912461672796:web:bcf702b30506eb56279199"

}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
