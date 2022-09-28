import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBREVTvh9ZVJV3WgSMBtGQ1OJgeCGjihYg",
  authDomain: "chatelloo.firebaseapp.com",
  projectId: "chatelloo",
  storageBucket: "chatelloo.appspot.com",
  messagingSenderId: "634296380840",
  appId: "1:634296380840:web:b8c1d513df4d35cc94419d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default getFirestore();
