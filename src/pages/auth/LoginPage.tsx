import { IonButton, useIonToast } from "@ionic/react";
import { lockClosed, mailOutline } from "ionicons/icons";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthPageLayout, AuthHeader, FloatingLabelInput, LoadingSpinner } from "../../components/common";
import { ROUTES } from "../../constants";
import "../../styles/auth/LoginPage.scss";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [presentToast] = useIonToast();

  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      history.replace(ROUTES.TABS_HOME);
    }
  }, [isLoggedIn, history]);

  const handleLogin = () => {
    if (!email || !password) {
      presentToast({ message: "Please enter both email and password.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      presentToast({ message: "Please enter a valid email address.", duration: 2500, color: "danger", position: "top" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      document.body.classList.remove("auth-page");
      if (localStorage.getItem("darkMode") === "true") {
        document.documentElement.classList.add("ion-palette-dark");
      }
      setLoading(false);
      history.push(ROUTES.TABS_HOME);
    }, 1000);
  };

  const handleSignUp = () => history.push(ROUTES.SIGNUP);
  const handleForgotPassword = () => history.push(ROUTES.FORGOT_PASSWORD);

  return (
    <AuthPageLayout>
      <AuthHeader
        title="Welcome!"
        subtitle="Login to your Account"
      />

      <div className="auth-form">
        <FloatingLabelInput
          label="Email"
          value={email}
          onValueChange={setEmail}
          type="email"
          inputMode="email"
          icon={mailOutline}
        />

        <FloatingLabelInput
          label="Password"
          value={password}
          onValueChange={setPassword}
          type="password"
          icon={lockClosed}
        />

        <div className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </div>

        <IonButton expand="block" className="otp-btn mt-20" onClick={handleLogin}>
          Sign In
        </IonButton>

        <div className="signup-text">
          Don't have an account?{" "}
          <span className="form-link" onClick={handleSignUp}>
            SIGN UP
          </span>
        </div>
      </div>
      <LoadingSpinner isOpen={loading} message="Signing in..." />
    </AuthPageLayout>
  );
};

export default LoginPage;
