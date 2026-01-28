import { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonToggle,
  IonAvatar,
} from "@ionic/react";

import {
  moonOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  lockClosedOutline,
  personOutline,
  helpCircleOutline,
  informationCircleOutline,
  chevronForwardOutline,
} from "ionicons/icons";

import { useIonRouter } from "@ionic/react";
import "../styles/SettingsPage.css";

const DARK_KEY = "darkMode";

const SettingsPage: React.FC = () => {
  const ionRouter = useIonRouter();

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem(DARK_KEY) === "true";
  });

  useEffect(() => {
  document.body.classList.toggle("dark", darkMode);
  document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
  localStorage.setItem("darkMode", String(darkMode));
}, [darkMode]);

  return (
    <IonPage>
      <IonHeader className="settings-header">
        <IonToolbar className="settings-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/profilepage" />
          </IonButtons>
          <IonTitle className="settings-title">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={false}className="settings-content">
        <IonItem
          lines="none"
          button
          detail={false}
          className="settings-profile-item"
          onClick={() => ionRouter.push("/tabs/profilepage")}
        >
          <IonAvatar slot="start" className="settings-profile-avatar">
            <img
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
              alt="Avatar"
            />
          </IonAvatar>

          <IonLabel className="settings-profile-label">
            <div className="settings-profile-name">Mark Parra</div>
            <div className="settings-profile-phone">09123456789</div>
          </IonLabel>

          <IonIcon
            slot="end"
            icon={chevronForwardOutline}
            className="settings-chevron"
          />
        </IonItem>
        <div className="settings-section">Other Settings</div>
        <IonList inset className="settings-list">
          <IonItem lines="full" className="settings-item" detail={false}>
            <IonIcon icon={moonOutline} slot="start" className="settings-icon" />
            <IonLabel className="settings-label">Dark Mode</IonLabel>
            <IonToggle
              slot="end"
              checked={darkMode}
              onIonChange={(e) => setDarkMode(e.detail.checked)}
              className="settings-toggle"
            />
          </IonItem>

          <IonItem lines="full" button className="settings-item" detail={false}>
            <IonIcon
              icon={notificationsOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Notifications</IonLabel>
            <IonIcon
              slot="end"
              icon={chevronForwardOutline}
              className="settings-chevron"
            />
          </IonItem>

          <IonItem lines="full" button className="settings-item" detail={false}>
            <IonIcon
              icon={shieldCheckmarkOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Privacy</IonLabel>
            <IonIcon
              slot="end"
              icon={chevronForwardOutline}
              className="settings-chevron"
            />
          </IonItem>

          <IonItem lines="full" button className="settings-item" detail={false}>
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Security</IonLabel>
            <IonIcon
              slot="end"
              icon={chevronForwardOutline}
              className="settings-chevron"
            />
          </IonItem>

          <IonItem lines="full" button className="settings-item" detail={false}>
            <IonIcon
              icon={personOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">My Account</IonLabel>
            <IonIcon
              slot="end"
              icon={chevronForwardOutline}
              className="settings-chevron"
            />
          </IonItem>

          <IonItem lines="full" button className="settings-item" detail={false}>
            <IonIcon
              icon={helpCircleOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Help</IonLabel>
            <IonIcon
              slot="end"
              icon={chevronForwardOutline}
              className="settings-chevron"
            />
          </IonItem>

          <IonItem lines="none" button className="settings-item" detail={false}>
            <IonIcon
              icon={informationCircleOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">About</IonLabel>
            <IonIcon
              slot="end"
              icon={chevronForwardOutline}
              className="settings-chevron"
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
