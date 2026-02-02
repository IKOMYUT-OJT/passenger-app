import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  IonText,
  IonAlert,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  person,
  mail,
  callOutline,
  home,
  lockClosed,
  eye,
  eyeOff,
  arrowBack,
} from "ionicons/icons";
import { useEffect, useState, useContext } from "react";
import { useIonRouter } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../App"; 
import "../styles/SignUpPage.css";



const SignUpPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const history = useHistory();

  const { setIsLoggedIn } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  useEffect(() => {
    if (isNavigating) return;
    
    const storedMobile = localStorage.getItem("verifiedMobile") ?? "";

    if (storedMobile) {
      setMobileNumber(storedMobile);
      localStorage.removeItem("pendingMobile");
    } else {
      ionRouter.push("/signup", "back");
    }
  }, [ionRouter, isNavigating]);

  const handleSignUp = () => {
    if (!fullName || !email || !mobileNumber || !address || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      setError("Email must end with @gmail.com");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setError("");
    setShowAlert(true);
  };

  const handleAlertDismiss = () => {
  setShowAlert(false);
  setIsNavigating(true);
  
  setTimeout(() => {
    localStorage.removeItem("verifiedMobile");
    localStorage.removeItem("pendingMobile");
    localStorage.removeItem("isLoggedIn");
    ionRouter.push("/login", "root", "replace");
  }, 0);
};

  const openTerms = () => window.open("/terms", "_blank");

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding signup-content">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeXs="12" sizeSm="8" sizeMd="6">
              <div className="signup-logo">
                <img src="/flogo1.png" alt="Logo" />
              </div>

              <h2 className="signup-title">Create Account</h2>
              <p className="signup-subtitle">Fill out the form to create your account</p>

              <form className="signup-form">
                <IonItem lines="none" className={`signup-item ${fullNameFocused || fullName ? 'has-value' : ''}`}>
                  <IonIcon icon={person} slot="start" />
                  <span className="floating-label">Full Name</span>
                  <IonInput
                    value={fullName}
                    onIonFocus={() => setFullNameFocused(true)}
                    onIonBlur={() => setFullNameFocused(false)}
                    onIonChange={(e) => setFullName(e.detail.value ?? "")}
                  />
                </IonItem>

                <IonItem lines="none" className="signup-item">
                  <IonIcon icon={callOutline} slot="start" />
                  <IonInput
                    placeholder="Mobile Number"
                    type="tel"
                    value={mobileNumber}
                    readonly
                  />
                </IonItem>

                <IonItem lines="none" className={`signup-item ${emailFocused || email ? 'has-value' : ''}`}>
                  <IonIcon icon={mail} slot="start" />
                  <span className="floating-label">Email</span>
                  <IonInput
                    type="email"
                    value={email}
                    onIonFocus={() => setEmailFocused(true)}
                    onIonBlur={() => setEmailFocused(false)}
                    onIonChange={(e) => setEmail(e.detail.value ?? "")}
                  />
                </IonItem>

                <IonItem lines="none" className={`signup-item ${addressFocused || address ? 'has-value' : ''}`}>
                  <IonIcon icon={home} slot="start" />
                  <span className="floating-label">Address</span>
                  <IonInput
                    value={address}
                    onIonFocus={() => setAddressFocused(true)}
                    onIonBlur={() => setAddressFocused(false)}
                    onIonChange={(e) => setAddress(e.detail.value ?? "")}
                  />
                </IonItem>

                <IonItem lines="none" className={`signup-item password-box ${passwordFocused || password ? 'has-value' : ''}`}>
                  <IonIcon icon={lockClosed} slot="start" />
                  <span className="floating-label">Password</span>
                  <IonInput
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onIonFocus={() => setPasswordFocused(true)}
                    onIonBlur={() => setPasswordFocused(false)}
                    onIonChange={(e) => setPassword(e.detail.value ?? "")}
                  />
                  <IonIcon
                    icon={showPassword ? eyeOff : eye}
                    slot="end"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  />
                </IonItem>

                <IonItem lines="none" className={`signup-item password-box ${confirmPasswordFocused || confirmPassword ? 'has-value' : ''}`}>
                  <IonIcon icon={lockClosed} slot="start" />
                  <span className="floating-label">Confirm Password</span>
                  <IonInput
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onIonFocus={() => setConfirmPasswordFocused(true)}
                    onIonBlur={() => setConfirmPasswordFocused(false)}
                    onIonChange={(e) => setConfirmPassword(e.detail.value ?? "")}
                  />
                  <IonIcon
                    icon={showConfirmPassword ? eyeOff : eye}
                    slot="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: "pointer" }}
                  />
                </IonItem>

                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="terms">
                    <span className="link-text" onClick={openTerms}>
                      I agree to the Terms of Service & Privacy Policy
                    </span>
                  </label>
                </div>

                {error && (
                  <IonText color="danger" className="signup-error">
                    {error}
                  </IonText>
                )}

                <IonButton
                   expand="block"
                   className="signup-button"
                   disabled={showAlert}
                   onClick={handleSignUp}
                  >
                  Sign Up
                </IonButton>

              </form>

              <IonAlert
                isOpen={showAlert}
                onDidDismiss={handleAlertDismiss}
                header="Success!"
                message="Registered Successfully!"
                buttons={["OK"]}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
