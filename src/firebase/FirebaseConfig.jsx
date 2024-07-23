// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import toast from "react-hot-toast";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Storage
const uploadProfileImage = async (file, user, setLoading) => {
  const splitEmail = user.email;
  const userName = splitEmail.split("@");
  const domainName = userName[1].split(".");
  const cleanEmail = userName[0] + domainName[0] + domainName[1]

  const fileRef = ref(storage, 'images/' + cleanEmail + '.jpg', );

  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const avatarRef = await getDownloadURL(fileRef);

  updateProfile(user, {avatar: avatarRef})

  setLoading(false);
  toast.success('File has been uploaded')
}

export { fireDB, auth, storage, uploadProfileImage }