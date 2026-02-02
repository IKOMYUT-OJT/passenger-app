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
  documentTextOutline,
  trashOutline,
} from "ionicons/icons";

import { useIonRouter } from "@ionic/react";
import "../styles/SettingsPage.css";

const SettingsPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || "flogo1.png";
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const handleProfileImageUpdate = () => {
      const updatedImage = localStorage.getItem("profileImage") || "flogo1.png";
      setProfileImage(updatedImage);
    };

    window.addEventListener("profileImageUpdated", handleProfileImageUpdate);
    return () => {
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdate);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem("darkMode", checked.toString());
    document.body.classList.toggle("dark", checked);
  };

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
              src={profileImage}
              alt="Avatar"
            />
          </IonAvatar>

          <IonLabel className="settings-profile-label">
            <div className="settings-profile-name">Mark Parra</div>
            <div className="settings-profile-phone">09124069789</div>
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
              onIonChange={(e) => handleDarkModeToggle(e.detail.checked)}
              className="settings-toggle"
            />
          </IonItem>

          <IonItem 
            lines="full" 
            button 
            className="settings-item" 
            detail={false}
            onClick={() => ionRouter.push("/notifications")}
          >
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

          <IonItem 
            lines="full" 
            button 
            className="settings-item" 
            detail={false}
            onClick={() => ionRouter.push("/change-password")}
          >
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Change Password</IonLabel>
            <IonIcon
              slot="end"
              icon={chevronForwardOutline}
              className="settings-chevron"
            />
          </IonItem>

          <IonItem 
            lines="full" 
            button 
            className="settings-item" 
            detail={false}
            onClick={() => ionRouter.push("/privacy-policy")}
          >
            <IonIcon
              icon={documentTextOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Privacy Policy</IonLabel>
            <IonIcon
              slot="end"
              icon={chevronForwardOutline}
              className="settings-chevron"
            />
          </IonItem>

          <IonItem 
            lines="full" 
            button 
            className="settings-item" 
            detail={false}
            onClick={() => ionRouter.push("/security")}
          >
            <IonIcon
              icon={shieldCheckmarkOutline}
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

          <IonItem 
            lines="full" 
            button 
            className="settings-item" 
            detail={false}
            onClick={() => ionRouter.push("/help")}
          >
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

          <IonItem 
            lines="full" 
            button 
            className="settings-item" 
            detail={false}
            onClick={() => ionRouter.push("/account-deletion")}
          >
            <IonIcon
              icon={trashOutline}
              slot="start"
              className="settings-icon"
            />
            <IonLabel className="settings-label">Account Deletion</IonLabel>
            <IonIcon
              slot="end"
              icon={chevronForwardOutline}
              className="settings-chevron"
            />
          </IonItem>

          <IonItem 
            lines="none" 
            button 
            className="settings-item" 
            detail={false}
            onClick={() => ionRouter.push("/about")}
          >
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
        <div className="settings-version">Version 4.4.2</div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
