import { IonPage, IonContent, IonButton, IonInput, IonItem, IonIcon } from "@ionic/react";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { callOutline } from "ionicons/icons";
import "../styles/MobileSignup.css";

const MobileSignupPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [mobile, setMobile] = useState("");
  const [mobileFocused, setMobileFocused] = useState(false);

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

        <IonItem className={`ms-input ${mobileFocused || mobile ? 'has-value' : ''}`} lines="none">
          <IonIcon icon={callOutline} slot="start" />
          <span className="floating-label">Mobile Number</span>
          <IonInput
            type="tel"
            inputMode="numeric"
            maxlength={11}
            value={mobile}
            onIonFocus={() => setMobileFocused(true)}
            onIonBlur={() => setMobileFocused(false)}
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
        </IonItem>

        <IonButton type="button" expand="block" className="ms-btn" onClick={handleSubmit}>
          Submit
        </IonButton>

        <div className="ms-footer">
          Already have an account?{" "}
          <span className="ms-link" onClick={handleGoLogin}>
            SIGN IN
          </span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MobileSignupPage;
