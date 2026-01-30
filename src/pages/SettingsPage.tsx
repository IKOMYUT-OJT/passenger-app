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

const SettingsPage: React.FC = () => {
  const ionRouter = useIonRouter();

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

      <IonContent fullscreen scrollY={true} className="settings-content">
        <IonItem
          lines="none"
          button
          detail={false}
          className="settings-profile-item"
          onClick={() => ionRouter.push("/tabs/profilepage")}
        >
          <IonAvatar slot="start" className="settings-profile-avatar">
            <img
              src="flogo1.png"
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
              checked={false}
              className="settings-toggle"
              disabled
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
