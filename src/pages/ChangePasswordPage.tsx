import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { lockClosedOutline } from "ionicons/icons";
import { PageHeader, FloatingLabelInput } from "../components/common";
import "../styles/ChangePasswordPage.css";

const ChangePasswordPage: React.FC = () => {
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
      <PageHeader title="Change Password" defaultHref="/tabs/profilepage" />

      <IonContent fullscreen scrollY={true} className="page-content">
        <div className="cp-form">
          <IonText className="form-hint">
            Enter your current password and create a new one.
          </IonText>

          <FloatingLabelInput
            label="Current Password"
            value={currentPassword}
            onValueChange={setCurrentPassword}
            type="password"
            icon={lockClosedOutline}
          />

          <FloatingLabelInput
            label="New Password"
            value={newPassword}
            onValueChange={setNewPassword}
            type="password"
            icon={lockClosedOutline}
          />

          <FloatingLabelInput
            label="Confirm New Password"
            value={confirmPassword}
            onValueChange={setConfirmPassword}
            type="password"
            icon={lockClosedOutline}
          />
        </div>

        <IonGrid className="cp-actions">
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                className="app-button-secondary"
                routerLink="/tabs/profilepage"
              >
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" className="app-button-primary" onClick={handleSave}>
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
