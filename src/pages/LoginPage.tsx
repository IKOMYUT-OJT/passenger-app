import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  IonText,
  IonItem,
} from "@ionic/react";
import { lockClosed, eye, eyeOff, callOutline } from "ionicons/icons";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../App";
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = () => {
    if (!mobileNumber || !password) {
      setError("Please enter both mobile number and password.");
      return;
    }

    setError("");
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    history.push("/tabs/homepage");
  };

  const handleSignUp = () => history.push("/signup");
  const handleForgotPassword = () => history.push("/forgot-password");

  return (
    <IonPage>
      <IonContent fullscreen className="login-content" scrollY={false}>
        {/* Logo centered */}
        <div className="login-header">
          <img src="./logo1.png" alt="Logo" className="login-logo" />
          <div className="login-texts">
            <h2 className="login-title">Welcome!</h2>
            <p className="login-subtitle">Login to your Account</p>
          </div>
        </div>

        {/* Form */}
        <div className="login-form">
          {/* Mobile Number */}
          <IonItem className="signup-item">
            <IonIcon slot="start" icon={callOutline} />
            <IonInput
              placeholder="Mobile Number"
              value={mobileNumber}
              onIonChange={(e) => setMobileNumber(e.detail.value!)}
            />
          </IonItem>

          {/* Password */}
          <IonItem className="signup-item password-box">
            <IonIcon slot="start" icon={lockClosed} />
            <IonInput
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
            <IonIcon
              slot="end"
              icon={showPassword ? eyeOff : eye}
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            />
          </IonItem>

          <div className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?
          </div>

          {error && (
            <IonText color="danger" className="login-error">
              {error}
            </IonText>
          )}

          <IonButton expand="block" className="login-button" onClick={handleLogin}>
            Sign In
          </IonButton>

          <div className="signup-text">
            Don’t have an account?{" "}
            <span className="signup-link" onClick={handleSignUp}>
              SIGN UP
            </span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
