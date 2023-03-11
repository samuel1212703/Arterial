import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import {
  albumsOutline,
  bookmarkOutline,
  earthOutline,
  newspaperOutline,
} from "ionicons/icons";
import "./Menu.css";
import { auth, googleSignIn } from "..//external/firebase";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "DiscoverArt",
    url: "/page/DiscoverArt",
    iosIcon: earthOutline,
    mdIcon: earthOutline,
  },
  {
    title: "SavedArt",
    url: "/page/SavedArt",
    iosIcon: albumsOutline,
    mdIcon: albumsOutline,
  },
  {
    title: "SpotNews",
    url: "/page/SpotNews",
    iosIcon: newspaperOutline,
    mdIcon: newspaperOutline,
  },
];

const labels = ["Family", "Friends"];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Arterial</IonListHeader>
          {auth.currentUser ? (
            <IonNote>{auth.currentUser.email}</IonNote>
          ) : (
            <button onClick={() => googleSignIn()}>Sign In</button>
          )}

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
