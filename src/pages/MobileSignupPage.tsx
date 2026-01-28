import { IonPage, IonContent, IonButton, IonInput } from "@ionic/react";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";
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
    ionRouter.push("/", "back");
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}className="ms-content">
        <div className="ms-wrap">
          <div className="ms-logo">
            <img src="/logo4.png" alt="Logo" />
          </div>

          <h2 className="ms-title">Hello!</h2>
          <p className="ms-subtitle">Create Your Account with Your Mobile Number</p>

          <div className="ms-input">
            <IonInput
              placeholder="Mobile Number"
              type="tel"
              inputMode="tel"
              value={mobile}
              onIonChange={(e) => setMobile(e.detail.value ?? "")}
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MobileSignupPage;
