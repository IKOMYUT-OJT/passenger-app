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
} from "@ionic/react";
import {
  lockClosedOutline,
  fingerPrintOutline,
  keyOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";
import "../styles/SecurityPage.css";

const SecurityPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="security-header">
        <IonToolbar className="security-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/settings" />
          </IonButtons>
          <IonTitle className="security-title">Security</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="security-content">
        <div className="security-section-label">Security Settings</div>
        
        <IonList className="security-list">
          <IonItem lines="full" className="security-item">
            <IonIcon icon={fingerPrintOutline} slot="start" className="security-icon" />
            <IonLabel className="security-label">Biometric Login</IonLabel>
            <IonToggle slot="end" checked={false} className="security-toggle" />
          </IonItem>

          <IonItem lines="full" className="security-item">
            <IonIcon icon={lockClosedOutline} slot="start" className="security-icon" />
            <IonLabel className="security-label">Two-Factor Authentication</IonLabel>
            <IonToggle slot="end" checked={false} className="security-toggle" />
          </IonItem>

          <IonItem lines="full" button className="security-item">
            <IonIcon icon={keyOutline} slot="start" className="security-icon" />
            <IonLabel className="security-label">Change Password</IonLabel>
          </IonItem>

          <IonItem lines="none" className="security-item">
            <IonIcon icon={shieldCheckmarkOutline} slot="start" className="security-icon" />
            <IonLabel className="security-label">
              <div className="security-label-title">App Lock</div>
              <div className="security-label-desc">Require authentication to open app</div>
            </IonLabel>
            <IonToggle slot="end" checked={false} className="security-toggle" />
          </IonItem>
        </IonList>

        <div className="security-info">
          <h3>Security Tips</h3>
          <ul>
            <li>Use a strong, unique password</li>
            <li>Enable two-factor authentication</li>
            <li>Never share your password with anyone</li>
            <li>Review your account activity regularly</li>
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SecurityPage;