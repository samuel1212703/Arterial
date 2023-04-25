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
import { ArtworkI } from "../pages/DiscoverArt";

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
// const analytics = getAnalytics(app);

// Firebase Variables
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export function setFeaturedContent(data: any) {
  setDoc(doc(db, "FeaturedContent"), data);
}

// Functions
export async function googleSignIn() {
  try {
    // const result = await signInWithPopup(auth, provider);
    return true;
  } catch (error) {
    return false;
  }
}

export async function addArtworkToFirestore(artwork: ArtworkI) {
  if (auth.currentUser) {
    const artwork_ref = doc(
      db,
      "users",
      auth.currentUser.uid,
      "favoritedArtworks",
      artwork.id.toString()
    );
    const artwork_data = {
      id: artwork.id,
      image_url: artwork.image_url,
      title: artwork.title,
      alt_titles: artwork.alt_titles,
      artist_title: artwork.artist_title,
      artist_id: artwork.artist_id,
      date_display: artwork.date_display,
      place_of_origin: artwork.place_of_origin,
      is_favorited: artwork.is_favorited,
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

export async function getFavoritedArtworksIDs(): Promise<ArtworkI[]> {
  const favoritedArtworks: ArtworkI[] = [];

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
      const docData = doc.data();
      favoritedArtworks.push({
        artwork_url: docData.artwork_url,
        id: docData.id,
        image_url: docData.image_url,
        title: docData.title,
        alt_titles: docData.alt_titles,
        artist_title: docData.artist_title,
        artist_id: docData.artist_id,
        date_display: docData.date_display,
        place_of_origin: docData.place_of_origin,
        is_favorited: docData.is_favorited,
      });
    });
  }

  return favoritedArtworks;
}
