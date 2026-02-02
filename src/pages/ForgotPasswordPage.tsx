import { IonPage, IonContent, IonButton, IonInput, IonIcon, IonItem } from "@ionic/react";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { arrowBack, callOutline } from "ionicons/icons";
import "../styles/ForgotPasswordPage.css";

const ForgotPasswordPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileFocused, setMobileFocused] = useState(false);

  const handleSend = () => {
    if (!mobileNumber || mobileNumber.length < 11) {
      alert("Please enter a valid 11-digit mobile number.");
      return;
    }
    localStorage.setItem("resetMobile", mobileNumber);
    localStorage.setItem("resetFlow", "true");
    ionRouter.push("/verify-reset-otp", "forward");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="forgot-password-content" scrollY={false}>
        <div className="forgot-logo">
          <img src="/flogo1.png" alt="Logo" />
        </div>
        
        <h2 className="forgot-password-title">Forgot Password</h2>
        <p className="forgot-password-subtitle">
          Enter your mobile number to receive a 
          verification code
        </p>
        

        <IonItem lines="none" className={`forgot-input-item ${mobileFocused || mobileNumber ? 'has-value' : ''}`}>
          <IonIcon icon={callOutline} slot="start" className="forgot-input-icon" />
          <span className="floating-label">Mobile Number</span>
          <IonInput
            type="tel"
            value={mobileNumber}
            maxlength={11}
            onIonFocus={() => setMobileFocused(true)}
            onIonBlur={() => setMobileFocused(false)}
            onIonChange={(e: any) => {
              const value = (e.detail.value ?? "").replace(/[^0-9]/g, "");
              setMobileNumber(value);
            }}
            onKeyPress={(e: any) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            className="forgot-input"
          />
        </IonItem>

        <IonButton expand="block" className="send-btn" onClick={handleSend}>
          Send
        </IonButton>

        <div className="back-to-signin" onClick={() => ionRouter.push("/login", "back")}>
          <IonIcon icon={arrowBack} className="back-icon" />
          <span>Back to Sign In</span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordPage;