import { IonCol, IonGrid, IonImg, IonRow, IonText } from "@ionic/react";
import { ArtworkI } from "../pages/DiscoverArt";
import "./Artwork.css";

const Artwork: React.FC<ArtworkI> = (props: ArtworkI) => {
  return (
    <IonGrid id="artwork-info">
      <IonRow>
        <IonCol>
          {props.image_url ? (
            <IonImg id="artwork-image" src={props.image_url}></IonImg>
          ) : (
            <IonText>No image</IonText>
          )}
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
