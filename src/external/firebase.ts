import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMxapLWs0Hugz6Z06VM-u8iBGa_3F6uIg",
  authDomain: "glossario-a1f7f.firebaseapp.com",
  projectId: "glossario-a1f7f",
  storageBucket: "glossario-a1f7f.appspot.com",
  messagingSenderId: "35671485008",
  appId: "1:35671485008:web:a66127da8da85700847f55",
  measurementId: "G-X8FPY2CSHZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Variables
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Functions
export async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    return true;
  } catch (error) {
    return false;
  }
}

export async function addArtworkToFirestore(
  artwork_id: string,
  artwork_url: string
) {
  if (auth.currentUser) {
    const artwork_ref = doc(
      db,
      "users",
      auth.currentUser.uid,
      "favoritedArtworks",
      artwork_id.toString()
    );
    const artwork_data = {
      id: artwork_id,
      url: artwork_url,
    };
    await setDoc(artwork_ref, artwork_data, { merge: true });
  }
}

export async function removeArtworkFromFirestore(artwork_id: string) {
  if (auth.currentUser) {
    const artwork_ref = doc(
      db,
      "users",
      auth.currentUser.uid,
      "favoritedArtworks",
      artwork_id.toString()
    );
    await deleteDoc(artwork_ref);
  }
}

export async function getFavoritedArtworksIDs(): Promise<number[]> {
  const favoritedArtworks: number[] = [];

  if (auth.currentUser) {
    const favoritedArtworks_ref = collection(
      db,
      "users",
      auth.currentUser.uid,
      "favoritedArtworks"
    );

    const q = query(favoritedArtworks_ref, where("id", "!=", null));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      favoritedArtworks.push(doc.data().id);
    });
  }

  return favoritedArtworks;
}
