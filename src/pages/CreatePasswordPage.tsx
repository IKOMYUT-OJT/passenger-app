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
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

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
    window.location.href = "/login";
  };

  return (
    <IonPage>
      <IonContent fullscreen className="create-password-content" scrollY={false}>
        <div className="create-logo">
          <img src="/flogo1.png" alt="Logo" />
        </div>
        
        <h2 className="create-password-title">Create New Password</h2>
        <p className="create-password-subtitle">
          Enter your new password
        </p>

        <IonItem lines="none" className={`create-input-item ${newPasswordFocused || newPassword ? 'has-value' : ''}`}>
          <IonIcon icon={lockClosed} slot="start" className="create-input-icon" />
          <span className="floating-label">New Password</span>
          <IonInput
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onIonFocus={() => setNewPasswordFocused(true)}
            onIonBlur={() => setNewPasswordFocused(false)}
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

        <IonItem lines="none" className={`create-input-item ${confirmPasswordFocused || confirmPassword ? 'has-value' : ''}`}>
          <IonIcon icon={lockClosed} slot="start" className="create-input-icon" />
          <span className="floating-label">Confirm Password</span>
          <IonInput
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onIonFocus={() => setConfirmPasswordFocused(true)}
            onIonBlur={() => setConfirmPasswordFocused(false)}
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

        <div className="back-to-signin" onClick={() => window.location.href = "/login"}>
          <IonIcon icon={arrowBack} className="back-icon" />
          <span>Back to Sign In</span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreatePasswordPage;