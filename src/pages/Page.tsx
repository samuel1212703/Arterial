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
  IonSpinner,
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
  //const randomID = Math.floor(Math.random() * IDs.length);
  const artworks_info = await getPageAmountFromArtic().then((total_pages) => {
    const randomPageNumber = Math.floor(Math.random() * total_pages);
    return axios
      .get(
        `https://api.artic.edu/api/v1/artworks?page=${randomPageNumber}&limit=0`
      )
      .then((response) => {
        return response.data;
      });
  });

  const artworkCollection: ArtworkI[] = [];

  artworks_info.data.forEach((artwork: any) => {
    const image_url =
      artworks_info.config.iiif_url +
      "/" +
      artwork.image_id +
      "/full/843,/0/default.jpg";
    artworkCollection.push({
      id: artwork.id,
      image_url: image_url,
      title: artwork.title,
      alt_titles: [],
      artist_title: artwork.artist_title,
      artist_id: artwork.artist_id,
      date_display: artwork.date_display,
      place_of_origin: artwork.place_of_origin,
    });
  });
  return artworkCollection;
}

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [artworkHistory, setArtworkHistory] = useState<ArtworkI[]>([]);
  const [artworkHistoryPage, setArtworkHistoryPage] = useState(0);
  const [artData, setArtData] = useState<ArtworkI | null>(null);
  const [showLoading, setShowLoading] = useState(false);

  function getArtworkData() {
    setShowLoading(true); // Start loading effect
    getPaginationFromArtic().then((result) => {
      let newArtworkHistory = artworkHistory.concat(result);
      console.log(artworkHistory.length, ">", result.length * 2);
      setArtworkHistory(newArtworkHistory);
      if (artworkHistory.length >= result.length * 2) {
        setArtworkHistory(newArtworkHistory.slice(0, 24));
      }

      if (artworkHistory.length <= 11) {
        setArtworkHistoryPage(0);
      } else {
        setArtworkHistoryPage(12); // 12 spaces for artworkHistory and 12 for the new results
      }
    });
    setShowLoading(false); // End Loading effect
  }

  function goBackToPreviousArtwork() {
    setArtworkHistoryPage((artworkHistoryPage) => artworkHistoryPage - 1);
    setArtData(artworkHistory[artworkHistoryPage - 1]);
  }

  function goForwardToNextArtwork() {
    console.log(artworkHistoryPage, artworkHistory.length);
    const step = 1;
    if (artworkHistoryPage >= artworkHistory.length - 1) {
      getArtworkData();
    }

    setArtworkHistoryPage((artworkHistoryPage) => artworkHistoryPage + step);
    setArtData(artworkHistory[artworkHistoryPage + step]);
  }

  if (firstRun) {
    // getMetArtworkIDs().then((MetIDs) => {
    //   getArtworkFromMet(MetIDs);
    // });
    //getArtworkFromArtic();
    getArtworkData();
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
          {artworkHistoryPage !== 0 ? (
            <IonButton onClick={() => goBackToPreviousArtwork()}>
              <IonIcon icon={arrowBackOutline}></IonIcon>Go Back
            </IonButton>
          ) : null}
          {/* <IonButton onClick={() => getArtworkData()}>
            <IonIcon icon={shuffleOutline}></IonIcon>Random
          </IonButton> */}
          <IonButton onClick={() => goForwardToNextArtwork()}>
            <IonIcon icon={arrowForwardOutline}></IonIcon>Go Forward
          </IonButton>
          {showLoading ? <IonSpinner name="bubbles"></IonSpinner> : null}
        </div>
        {artData ? <Artwork {...artData}></Artwork> : null}
        <IonLoading isOpen={showLoading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};

export default Page;
