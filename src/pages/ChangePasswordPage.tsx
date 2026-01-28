import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { eyeOutline, eyeOffOutline, lockClosedOutline } from "ionicons/icons";
import "../styles/ChangePasswordPage.css";

const ChangePasswordPage: React.FC = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <IonPage>
      <IonHeader className="cp-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/profilepage" />
          </IonButtons>

          
          <IonTitle slot="start" className="cp-title">
            Change Password
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={false} className="cp-content">
        <div className="cp-form">
          <IonText className="cp-hint">
            Enter your current password and create a new one.
          </IonText>

          <IonItem lines="none" className="cp-input password-input">
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="cp-left-icon"
            />
            <IonInput
              placeholder="Current Password"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onIonChange={(e) => setCurrentPassword(e.detail.value!)}
            />
            <IonIcon
              icon={showCurrent ? eyeOffOutline : eyeOutline}
              slot="end"
              className="password-toggle"
              onClick={() => setShowCurrent(!showCurrent)}
            />
          </IonItem>

          
          <IonItem lines="none" className="cp-input password-input">
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="cp-left-icon"
            />
            <IonInput
              placeholder="New Password"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onIonChange={(e) => setNewPassword(e.detail.value!)}
            />
            <IonIcon
              icon={showNew ? eyeOffOutline : eyeOutline}
              slot="end"
              className="password-toggle"
              onClick={() => setShowNew(!showNew)}
            />
          </IonItem>

          
          <IonItem lines="none" className="cp-input password-input">
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="cp-left-icon"
            />
            <IonInput
              placeholder="Confirm New Password"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            />
            <IonIcon
              icon={showConfirm ? eyeOffOutline : eyeOutline}
              slot="end"
              className="password-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
            />
          </IonItem>
        </div>

        <IonGrid className="cp-actions">
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                className="cp-cancel"
                routerLink="/tabs/profilepage"
              >
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" className="cp-save" onClick={handleSave}>
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChangePasswordPage;
