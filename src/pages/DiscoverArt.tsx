import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonRow,
  IonCol,
  IonContent,
  IonToolbar,
  IonHeader,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from "@ionic/react";
import { useParams } from "react-router";
import Artwork from "../components/Artwork";
import "./DiscoverArt.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  arrowBackOutline,
  arrowForwardOutline,
  starOutline,
  star,
} from "ionicons/icons";
import {
  addArtworkToFirestore,
  auth,
  getFavoritedArtworksIDs,
  removeArtworkFromFirestore,
} from "../external/firebase";

let firstRun = true;
const artworkAmountPerPage = 12;
const artworkAmountPerSession = artworkAmountPerPage * 2;

export interface ArtworkI {
  artwork_url: string;
  id: any;
  image_url: string;
  title: any;
  alt_titles: string[];
  artist_title: any;
  artist_id: any;
  date_display: any;
  place_of_origin: any;
  is_favorited: boolean;
}

async function getArtworkFromArtic() {
  //https://api.artic.edu/docs/
  let response = null;
  while (response === null) {
    try {
      const randomID = Math.floor(Math.random() * 118760);
      response = await axios.get(
        `https://api.artic.edu/api/v1/artworks/${randomID}?fields=id,title,alt_titles,image_id,date_display,artist_display,artist_title,place_of_origin,artist_id`
      );
    } catch (e) {
      if (response?.data.status === 404 || response?.data.image_id == null) {
        response = null;
      }
    }
  }

  const artwork_info = response.data;
  const image_url =
    artwork_info.config.iiif_url +
    "/" +
    artwork_info.data.image_id +
    "/full/843,/0/default.jpg";
  const alternative_titles = [];
  if (artwork_info.data.alt_titles !== null) {
    for (let alt_title of artwork_info.data.alt_titles) {
      alternative_titles.push(alt_title);
    }
  }

  return {
    id: artwork_info.data.id,
    image_url: image_url,
    title: artwork_info.data.title,
    alt_titles: alternative_titles,
    artist_title: artwork_info.data.artist_title,
    artist_id: artwork_info.data.artist_id,
    date_display: artwork_info.data.date_display,
    place_of_origin: artwork_info.data.place_of_origin,
  };
}

async function getMetArtworkIDs() {
  return await axios
    .get(`https://collectionapi.metmuseum.org/public/collection/v1/objects`)
    .then((result) => {
      return result.data.objectIDs;
    });
}

async function getArtworkFromMet(IDs: number[]) {
  //https://metmuseum.github.io/
  let response = null;
  while (response === null) {
    try {
      const randomID = Math.floor(Math.random() * IDs.length);
      response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`
      );
      if (
        response?.data.artistDisplayName === "" ||
        response?.data.primaryImage === "" ||
        response?.data.title === ""
      ) {
        response = null;
      }
    } catch (e) {
      if (response?.data.status === 404) {
        response = null;
      }
    }
  }

  const artwork_info = response.data;

  return {
    id: artwork_info.objectID,
    image_url: artwork_info.primaryImage,
    title: artwork_info.title,
    alt_titles: [],
    artist_title: artwork_info.artistDisplayName,
    artist_id: artwork_info.artist_id,
    date_display: artwork_info.objectDate,
    place_of_origin: artwork_info.city + artwork_info.country,
  };
}

async function getPageAmountFromArtic() {
  return await axios
    .get(`https://api.artic.edu/api/v1/artworks?limit=0`)
    .then((response) => {
      return response.data.pagination.total_pages;
    });
}

async function getPaginationFromArtic() {
  const artwork_IDs: number[] = await getFavoritedArtworksIDs().then((res) => {
    return res;
  });

  const artworks_info = await getPageAmountFromArtic().then(
    async (total_pages) => {
      const randomPageNumber = Math.floor(Math.random() * total_pages);
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${randomPageNumber}&limit=${artworkAmountPerPage}`
      );
      return response.data;
    }
  );

  const artworkCollection: ArtworkI[] = [];

  artworks_info.data.forEach((artwork: any) => {
    let isFavorited: boolean = false;

    if (artwork_IDs.includes(artwork.id)) {
      isFavorited = true;
    }

    const image_url =
      artworks_info.config.iiif_url +
      "/" +
      artwork.image_id +
      "/full/843,/0/default.jpg";

    artworkCollection.push({
      artwork_url: artwork.api_link,
      id: artwork.id,
      image_url: image_url,
      title: artwork.title,
      alt_titles: [],
      artist_title: artwork.artist_title,
      artist_id: artwork.artist_id,
      date_display: artwork.date_display,
      place_of_origin: artwork.place_of_origin,
      is_favorited: isFavorited,
    });
  });
  return artworkCollection;
}

const DiscoverArt: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [artworkHistory, setArtworkHistory] = useState<ArtworkI[]>([]);
  const [artworkHistoryPage, setArtworkHistoryPage] = useState(0);
  const [artData, setArtData] = useState<ArtworkI | null>(null);
  const [currentlyCollectingArtworks, setCurrentlyCollectingArtworks] =
    useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  function getArtworkData() {
    setCurrentlyCollectingArtworks(true);
    getPaginationFromArtic().then((result) => {
      let newArtworkHistory = artworkHistory.concat(result);

      // Slice history if the length exceeds maximum
      if (newArtworkHistory.length > artworkAmountPerSession) {
        newArtworkHistory = newArtworkHistory.slice(0, artworkAmountPerSession);
      }
      setArtworkHistory(newArtworkHistory);

      // Update Artwork History
      if (artworkHistory.length < artworkAmountPerPage - 1) {
        setArtworkHistoryPage(0);
      } else {
        setArtworkHistoryPage(artworkAmountPerSession - artworkAmountPerPage); // 12 spaces for below artworkHistory and 12 above for the new results
      }
      setCurrentlyCollectingArtworks(false);
    });
  }

  function changeArtworkHistoryPage(step: number) {
    setArtworkHistoryPage((artworkHistoryPage) => artworkHistoryPage + step);
    setArtData(artworkHistory[artworkHistoryPage + step]);
  }

  function goBackToPreviousArtwork() {
    changeArtworkHistoryPage(-1);
  }

  function goForwardToNextArtwork() {
    if (
      artworkHistoryPage >= artworkHistory.length - 1 &&
      !currentlyCollectingArtworks
    ) {
      getArtworkData();
    }

    // If there is no image, skip the artwork
    if (artData) {
      setIsFavorited(artworkHistory[artworkHistoryPage].is_favorited);
    }

    changeArtworkHistoryPage(1);
  }

  function changeFavoritedStatus() {
    setIsFavorited(isFavorited ? false : true);
    const currentArtwork = artworkHistory[artworkHistoryPage];
    if (!isFavorited) {
      addArtworkToFirestore(currentArtwork.id, currentArtwork.artwork_url);
    } else {
      removeArtworkFromFirestore(currentArtwork.id);
    }
  }

  useEffect(() => {
    setArtData(artworkHistory[artworkHistoryPage]);
  }, [currentlyCollectingArtworks]);

  if (firstRun) {
    firstRun = !firstRun;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div>
          <IonRow>
            <IonCol>
              {artworkHistoryPage !== 0 ? (
                <IonButton
                  id="go-back-button"
                  onClick={() => goBackToPreviousArtwork()}
                >
                  <IonIcon icon={arrowBackOutline}></IonIcon>Go Back
                </IonButton>
              ) : null}
            </IonCol>
            <IonCol>
              {auth.currentUser && !currentlyCollectingArtworks ? (
                <div id="center-space">
                  <IonIcon
                    onClick={() => changeFavoritedStatus()}
                    size="large"
                    icon={isFavorited ? star : starOutline}
                  ></IonIcon>
                </div>
              ) : null}
            </IonCol>
            <IonCol>
              {currentlyCollectingArtworks ? (
                <IonSpinner name="crescent"></IonSpinner>
              ) : (
                <IonButton
                  id="go-forward-button"
                  onClick={() => goForwardToNextArtwork()}
                >
                  Go Forward<IonIcon icon={arrowForwardOutline}></IonIcon>
                </IonButton>
              )}
            </IonCol>
          </IonRow>
        </div>
        {artData ? <Artwork {...artData}></Artwork> : null}
      </IonContent>
    </IonPage>
  );
};

export default DiscoverArt;
