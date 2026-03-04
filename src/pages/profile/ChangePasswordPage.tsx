import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  useIonToast,
} from "@ionic/react";
import { lockClosedOutline } from "ionicons/icons";
import { PageHeader, FloatingLabelInput } from "../../components/common";
import { ROUTES } from "../../constants";
import "../../styles/profile/ChangePasswordPage.scss";

const ChangePasswordPage: React.FC = () => {
  const [presentToast] = useIonToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      presentToast({ message: "Please fill in all fields.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    if (newPassword.length < 6) {
      presentToast({ message: "New password must be at least 6 characters.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    if (newPassword !== confirmPassword) {
      presentToast({ message: "New passwords do not match.", duration: 2500, color: "danger", position: "top" });
      return;
    }

    presentToast({ message: "Password changed successfully!", duration: 2500, color: "success", position: "top" });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <IonPage data-page="changepassword">
      <PageHeader title="Change Password" defaultHref={ROUTES.TABS_PROFILE} />

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
                routerLink={ROUTES.TABS_PROFILE}
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
