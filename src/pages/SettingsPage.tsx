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
  lockClosedOutline,
  shieldCheckmarkOutline,
  personOutline,
  helpCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";

import "../styles/SettingsPage.css";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      {/* HEADER like screenshot */}
      <IonHeader className="settings-header">
        <IonToolbar className="settings-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/profilepage" />
          </IonButtons>

          <IonTitle className="settings-title">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* CONTENT */}
      <IonContent fullscreen scrollY={false} className="edit-profile-content">
        {/* PROFILE HEADER */}
        <div className="profile-header">
          
            <IonAvatar className="profile-avatar">
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg"
              alt="Avatar" />
            </IonAvatar>
          

          <h2 className="profile-name">Mark Parra</h2>
          <p className="profile-phone">09123456789</p>
        </div>

        {/* SETTINGS LIST */}
        <IonList className="settings-list" lines="full">
          {/* Dark Mode: toggle, no chevron */}
          <IonItem className="settings-item" detail={false}>
            <IonIcon icon={moonOutline} slot="start" className="settings-icon" />
            <IonLabel className="settings-label">Dark Mode</IonLabel>
            <IonToggle slot="end" />
          </IonItem>

          {/* With chevrons */}
          <IonItem button className="settings-item" detail={true}>
            <IonIcon
              icon={notificationsOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Notifications</IonLabel>
          </IonItem>

          <IonItem button className="settings-item" detail={true}>
            <IonIcon
              icon={shieldCheckmarkOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Privacy</IonLabel>
          </IonItem>

          <IonItem button className="settings-item" detail={true}>
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Security</IonLabel>
          </IonItem>

          <IonItem button className="settings-item" detail={true}>
            <IonIcon
              icon={personOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">My Account</IonLabel>
          </IonItem>

          <IonItem button className="settings-item" detail={true}>
            <IonIcon
              icon={helpCircleOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Help</IonLabel>
          </IonItem>

          <IonItem button className="settings-item" detail={true}>
            <IonIcon
              icon={informationCircleOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">About</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
