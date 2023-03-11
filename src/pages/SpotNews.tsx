import { useParams } from "react-router";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ArtworkI } from "./DiscoverArt";

let firstRun = true;

const SpotNews: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  if (firstRun) {
    firstRun = false;
  }

  // https://api.wikimedia.org/wiki/API_reference/Feed/Featured_content

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
        <div>hey</div>
      </IonContent>
    </IonPage>
  );
};

export default SpotNews;
