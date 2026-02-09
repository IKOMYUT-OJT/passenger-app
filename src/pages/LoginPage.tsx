import { IonButton, IonText } from "@ionic/react";
import { lockClosed, callOutline } from "ionicons/icons";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../App";
import { AuthPageLayout, AuthHeader, FloatingLabelInput, LoadingSpinner } from "../components/common";
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      history.replace("/tabs/homepage");
    }
  }, [isLoggedIn, history]);

  const handleLogin = () => {
    if (!mobileNumber || !password) {
      setError("Please enter both mobile number and password.");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setLoading(false);
      history.push("/tabs/homepage");
    }, 1000);
  };

  const handleSignUp = () => history.push("/signup");
  const handleForgotPassword = () => history.push("/forgot-password");

  return (
    <AuthPageLayout>
      <AuthHeader
        title="Welcome!"
        subtitle="Login to your Account"
      />

      <div className="auth-form">
        <FloatingLabelInput
          label="Mobile Number"
          value={mobileNumber}
          onValueChange={setMobileNumber}
          type="tel"
          inputMode="numeric"
          icon={callOutline}
          maxlength={11}
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

        {error && (
          <IonText color="danger" className="form-error">
            {error}
          </IonText> 
        )}

        <IonButton expand="block" className="app-button-primary mt-20" onClick={handleLogin}>
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
