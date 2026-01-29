import { IonPage, IonContent, IonButton, IonInput, IonIcon } from "@ionic/react";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import "../styles/MobileSignup.css";

const MobileSignupPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [mobile, setMobile] = useState("");

  const handleSubmit = () => {
    const clean = (mobile ?? "").replace(/\s+/g, "");

    if (!clean) {
      alert("Please enter your mobile number.");
      return;
    }

    if (clean.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }

    localStorage.setItem("pendingMobile", clean);
    ionRouter.push("/signup/verify", "forward");
  };

  const handleGoLogin = () => {
    localStorage.removeItem("pendingMobile");
    localStorage.removeItem("verifiedMobile");
    ionRouter.push("/login", "back");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ms-content" scrollY={false}>
        <div className="ms-logo">
          <img src="/flogo1.png" alt="Logo" />
        </div>

        <h2 className="ms-title">Hello!</h2>
        <p className="ms-subtitle">Create Your Account with Your Mobile Number</p>

        <div className="ms-input">
          <IonInput
            placeholder="09XXXXXXXXX"
            type="tel"
            inputMode="numeric"
            maxlength={11}
            value={mobile}
            onIonChange={(e) => {
              const value = (e.detail.value ?? '').replace(/[^0-9]/g, '');
              setMobile(value);
            }}
            onKeyPress={(e: any) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>

        <IonButton type="button" expand="block" className="ms-btn" onClick={handleSubmit}>
          Submit
        </IonButton>

        
        <div className="ms-footer">
          Already have an account?{" "}
          <span className="ms-link" onClick={handleGoLogin}>
            SIGN IN
          </span>
        </div>

         <div className="back-to-signin" onClick={handleGoLogin}>
          <IonIcon icon={arrowBack} className="back-icon" />
          <span>Back to Sign In</span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MobileSignupPage;
