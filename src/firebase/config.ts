import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTRIfPYEs1-tLHpsgZuCwHU8cnQ78LBVE",
  authDomain: "quickbite-32a21.firebaseapp.com",
  projectId: "quickbite-32a21",
  storageBucket: "quickbite-32a21.appspot.com",
  messagingSenderId: "781864302225",
  appId: "1:781864302225:web:322903099e01c06aae7130",
};

const firebaseApp = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(firebaseApp);
const projectAuth = getAuth(firebaseApp);
const projectStorage = getStorage(firebaseApp);

export { firebaseApp, projectFirestore, projectAuth, projectStorage };
