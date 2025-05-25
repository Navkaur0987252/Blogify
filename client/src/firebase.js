// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "mern-blog-6ec44.firebaseapp.com",
//   projectId: "mern-blog-6ec44",
//   storageBucket: "mern-blog-6ec44.appspot.com",
//   messagingSenderId: "698267509331",
//   appId: "1:698267509331:web:ee119fde99aefe44809ca6"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAuS04TfTlx-YhsvxpNtSGu0bC-yBJYohQ",
  authDomain: "monkey-3ba5e.firebaseapp.com",
  projectId: "monkey-3ba5e",
  storageBucket: "monkey-3ba5e.appspot.com", // <-- Corrected line
  messagingSenderId: "227474578154",
  appId: "1:227474578154:web:1cf065baac47d787e85593",
  measurementId: "G-WZ4CFE2YSK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


//  apiKey: "AIzaSyAuS04TfTlx-YhsvxpNtSGu0bC-yBJYohQ",
//   authDomain: "monkey-3ba5e.firebaseapp.com",
//   projectId: "monkey-3ba5e",
//   storageBucket: "monkey-3ba5e.firebasestorage.app",
//   messagingSenderId: "227474578154",
//   appId: "1:227474578154:web:1cf065baac47d787e85593",
//   measurementId: "G-WZ4CFE2YSK"