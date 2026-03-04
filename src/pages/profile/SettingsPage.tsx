import {
  IonPage,
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
  helpCircleOutline,
  informationCircleOutline,
  chevronForwardOutline,
  documentTextOutline,
  trashOutline,
} from "ionicons/icons";

import { useIonRouter } from "@ionic/react";
import { PageHeader } from "../../components/common";
import { useProfileImage } from "../../hooks";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { ROUTES } from "../../constants";
import "../../styles/profile/SettingsPage.scss";

const SettingsPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const { profileImage } = useProfileImage("flogo1.png");
  const { darkMode, setDarkMode } = useDarkMode();

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
  };

  return (
    <IonPage data-page="settings">
      <PageHeader title="Settings" defaultHref={ROUTES.TABS_PROFILE} />

      <IonContent fullscreen scrollY={true} className="page-content">
        <IonItem
          lines="none"
          button
          detail={false}
          className="settings-profile-item"
          onClick={() => ionRouter.push(ROUTES.TABS_PROFILE)}
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
            onClick={() => ionRouter.push(ROUTES.NOTIFICATIONS)}
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
            onClick={() => ionRouter.push(ROUTES.CHANGE_PASSWORD)}
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
            onClick={() => ionRouter.push(ROUTES.PRIVACY_POLICY)}
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
            onClick={() => ionRouter.push(ROUTES.SECURITY)}
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
            onClick={() => ionRouter.push(ROUTES.HELP)}
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
            onClick={() => ionRouter.push(ROUTES.ACCOUNT_DELETION)}
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
            onClick={() => ionRouter.push(ROUTES.ABOUT)}
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
