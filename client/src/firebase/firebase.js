
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAgKXRlHYLoLmYBGqAFyaICtkZNuBwptqE",
  authDomain: "e-commerce-d39ff.firebaseapp.com",
  projectId: "e-commerce-d39ff",
  storageBucket: "e-commerce-d39ff.appspot.com",
  messagingSenderId: "528911605797",
  appId: "1:528911605797:web:9205c0fe410c3519ca5fcc",
  measurementId: "G-4VD91QWYYK"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);