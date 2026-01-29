import { IonPage, IonContent, IonButton, IonInput, IonIcon, IonItem } from "@ionic/react";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { lockClosed, eye, eyeOff, arrowBack } from "ionicons/icons";
import "../styles/CreatePasswordPage.css";

const CreatePasswordPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    
    localStorage.removeItem("resetMobile");
    localStorage.removeItem("resetFlow");
    alert("Password reset successful!");
    ionRouter.push("/login", "root", "replace");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="create-password-content" scrollY={false}>
        <h2 className="create-password-title">Create New Password</h2>
        <p className="create-password-subtitle">
          Enter your new password
        </p>

        <IonItem lines="none" className="create-input-item">
          <IonIcon icon={lockClosed} slot="start" className="create-input-icon" />
          <IonInput
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onIonChange={(e: any) => setNewPassword(e.detail.value ?? "")}
            className="create-input"
          />
          <IonIcon
            icon={showNewPassword ? eyeOff : eye}
            slot="end"
            className="create-eye-icon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        </IonItem>

        <IonItem lines="none" className="create-input-item">
          <IonIcon icon={lockClosed} slot="start" className="create-input-icon" />
          <IonInput
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onIonChange={(e: any) => setConfirmPassword(e.detail.value ?? "")}
            className="create-input"
          />
          <IonIcon
            icon={showConfirmPassword ? eyeOff : eye}
            slot="end"
            className="create-eye-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </IonItem>

        <IonButton expand="block" className="reset-password-btn" onClick={handleResetPassword}>
          Reset Password
        </IonButton>

        <div className="back-to-signin" onClick={() => ionRouter.push("/forgot-password", "back")}>
          <IonIcon icon={arrowBack} className="back-icon" />
          <span>Back to Forgot Password</span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreatePasswordPage;