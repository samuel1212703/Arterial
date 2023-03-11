import { useParams } from "react-router";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { getFavoritedArtworksIDs } from "../external/firebase";
import { useEffect, useState } from "react";
import { ArtworkI } from "./DiscoverArt";
import Artwork from "../components/Artwork";
import {
  arrowBackOutline,
  arrowForwardOutline,
  playForwardCircleSharp,
  playForwardOutline,
} from "ionicons/icons";

let firstRun = true;
const artworksPerPage = 12;

async function getArt() {
  const favoritedArtworks = await getFavoritedArtworksIDs();
  return favoritedArtworks;
}

const SavedArt: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [favoritedArtworks, setFavoritedArtworks] = useState<ArtworkI[][]>([]);
  const [pageArtworks, setPageArtworks] = useState<ArtworkI[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fullScreenImage, setFullScreenImage] = useState<ArtworkI | null>();
  const [pageNumber, setPageNumber] = useState(0);

  function getFavoritedArtworks() {
    const artworksCollection: ArtworkI[][] = [];

    setLoading(true);
    console.log("Getting artworks...");
    getArt().then((art) => {
      for (let i = 0; i < art.length; i += artworksPerPage) {
        const chunk = art.slice(i, i + artworksPerPage);
        artworksCollection.push(chunk);
      }
      setFavoritedArtworks(artworksCollection);
      setPageNumber(0);
      setLoading(false);
    });
  }

  useEffect(() => {
    setPageArtworks(favoritedArtworks[pageNumber]);
  }, [pageNumber, loading, favoritedArtworks]);

  if (firstRun) {
    getFavoritedArtworks();
    firstRun = false;
  }

  return (
    <IonPage>
      {fullScreenImage ? (
        <div
          id="fullscreen-image-container"
          onClick={() => {
            setFullScreenImage(null);
          }}
        >
          <Artwork key="fullScreenImage" {...fullScreenImage}></Artwork>
        </div>
      ) : null}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {!loading ? (
          <div>
            {pageArtworks
              ? pageArtworks.map((artwork) => {
                  return (
                    <div
                      key={artwork.id}
                      style={{ width: "30%", display: "inline-flex" }}
                    >
                      <div onClick={() => setFullScreenImage(artwork)}>
                        <Artwork key={artwork.id} {...artwork}></Artwork>
                      </div>
                    </div>
                  );
                })
              : null}
            <div>
              <button
                onClick={() => {
                  setPageNumber((pageNumber) => pageNumber - 1);
                }}
              >
                <IonIcon size="large" icon={arrowBackOutline}></IonIcon>
              </button>
              <button
                onClick={() => {
                  setPageNumber((pageNumber) => pageNumber + 1);
                }}
              >
                <IonIcon size="large" icon={arrowForwardOutline}></IonIcon>
              </button>
              <button
                onClick={() => {
                  setPageNumber((pageNumber) => pageNumber + 2);
                }}
              >
                <IonIcon size="large" icon={playForwardOutline}></IonIcon>
              </button>
            </div>
          </div>
        ) : (
          <IonSpinner name="crescent"></IonSpinner>
        )}
        <div></div>
      </IonContent>
    </IonPage>
  );
};

export default SavedArt;
