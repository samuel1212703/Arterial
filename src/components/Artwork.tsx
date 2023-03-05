import { IonCol, IonGrid, IonImg, IonRow, IonText } from "@ionic/react";
import { ArtworkI } from "../pages/Page";
import "./Artwork.css";

const Artwork: React.FC<ArtworkI> = (props: ArtworkI) => {
  return (
    <IonGrid id="artwork-info">
      <IonRow>
        <IonCol>
          <IonImg id="artwork-image" src={props.image_url}></IonImg>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonText id="artwork-title">
            {props.title} — ({props.date_display})
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonText id="artwork-alt-titles">
            {props.alt_titles ? (
              <IonText id="artwork-alt-titles">{props.alt_titles}</IonText>
            ) : null}
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonText id="artwork-artist-titles">{props.artist_title}</IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Artwork;
