import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonButton,
  IonIcon,
} from "@ionic/react";
//import { Storage } from '@ionic/storage';
import { useParams } from "react-router";
import Artwork from "../components/Artwork";
import "./Page.css";
import axios from "axios";
import { useState } from "react";
import {
  arrowBackOutline,
  arrowForwardOutline,
  shuffleOutline,
} from "ionicons/icons";

let firstRun = true;

export interface ArtworkI {
  id: any;
  image_url: string;
  title: any;
  alt_titles: string[];
  artist_title: any;
  artist_id: any;
  date_display: any;
  place_of_origin: any;
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
    console.log(artwork_info.data.alt_titles);
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

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [artworkHistory, setArtworkHistory] = useState<ArtworkI[]>([]);
  const [artworkHistoryPage, setArtworkHistoryPage] = useState(
    artworkHistory.length
  );
  const [artData, setArtData] = useState<ArtworkI | null>(null);
  const [showLoading, setShowLoading] = useState(false);

  function getArtworkData() {
    setShowLoading(true); // Start loading effect
    getMetArtworkIDs()
      .then((MetIDs) => {
        return getArtworkFromMet(MetIDs);
      })
      .then((result) => {
        setArtData(result);
        let newArtworkHistory = artworkHistory;
        if (artworkHistory.length >= 9) {
          newArtworkHistory = artworkHistory.slice(-1);
        }
        setArtworkHistory([result, ...newArtworkHistory]);
        setArtworkHistoryPage(0); // A new artwork is added and going back should start at the beginning again
      });
    setShowLoading(false); // End Loading effect
  }

  function goBackToPreviousArtwork() {
    setArtworkHistoryPage((artworkHistoryPage) => artworkHistoryPage + 1);
    setArtData(artworkHistory[artworkHistoryPage + 1]);
  }

  function goForwardToNextArtwork() {
    setArtworkHistoryPage((artworkHistoryPage) => artworkHistoryPage - 1);
    setArtData(artworkHistory[artworkHistoryPage - 1]);
  }

  if (firstRun) {
    getMetArtworkIDs().then((MetIDs) => {
      getArtworkFromMet(MetIDs);
    });
    //getArtworkData();
    firstRun = false;
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
          {artworkHistory.length &&
          artworkHistoryPage !== artworkHistory.length ? (
            <IonButton onClick={() => goBackToPreviousArtwork()}>
              <IonIcon icon={arrowBackOutline}></IonIcon>Go Back
            </IonButton>
          ) : null}
          <IonButton onClick={() => getArtworkData()}>
            <IonIcon icon={shuffleOutline}></IonIcon>Random
          </IonButton>
          {artworkHistory.length && artworkHistoryPage !== 0 ? (
            <IonButton onClick={() => goForwardToNextArtwork()}>
              <IonIcon icon={arrowForwardOutline}></IonIcon>Go Forward
            </IonButton>
          ) : null}
        </div>
        {artData ? <Artwork {...artData}></Artwork> : null}
        <IonLoading isOpen={showLoading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};

export default Page;
