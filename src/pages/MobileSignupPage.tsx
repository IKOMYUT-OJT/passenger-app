import { IonButton, IonIcon, IonInput, IonItem, IonText, IonAlert } from "@ionic/react";
import { useState, useMemo, useEffect, useContext } from "react";
import { useIonRouter } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { callOutline, arrowBack, person, mail, home } from "ionicons/icons";
import { AuthContext } from "../App";
import { AuthPageLayout, AuthHeader, FloatingLabelInput, LoadingSpinner } from "../components/common";
import "../styles/MobileSignup.css";

const MobileSignupPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const history = useHistory();
  const { setIsLoggedIn } = useContext(AuthContext);
  
  const [step, setStep] = useState(1); // 1=mobile, 2=otp, 3=details
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(20);
  const otpValue = useMemo(() => code.join(""), [code]);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step === 2 && seconds <= 0) return;
    if (step === 2) {
      const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [seconds, step]);

  const handleMobileSubmit = () => {
    const clean = (mobile ?? "").replace(/\s+/g, "");
    if (!clean) {
      alert("Please enter your mobile number.");
      return;
    }
    if (clean.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setSeconds(20);
    }, 1000);
  };

  const setDigit = (idx: number, val: string) => {
    const v = (val ?? "").replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[idx] = v;
      return next;
    });
    if (v && idx < 5) {
      (document.getElementById(`otp-${idx + 1}`) as HTMLInputElement | null)?.focus();
    }
  };

  const handleVerify = () => {
    if (otpValue.length !== 6) {
      alert("Please enter the 6-digit code.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const handleResend = () => {
    setSeconds(20);
    setCode(["", "", "", "", "", ""]);
    (document.getElementById("otp-0") as HTMLInputElement | null)?.focus();
  };

  const handleSignUp = () => {
    if (!fullName || !email || !mobile || !address || !password || !confirmPassword) {
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAlert(true);
    }, 1500);
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    setIsNavigating(true);
    localStorage.removeItem("verifiedMobile");
    localStorage.removeItem("pendingMobile");
    localStorage.removeItem("isLoggedIn");
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };

  const handleGoLogin = () => {
    localStorage.removeItem("pendingMobile");
    localStorage.removeItem("verifiedMobile");
    ionRouter.push("/login", "back");
  };

  const openTerms = () => window.open("/terms", "_blank");

  return (
    <AuthPageLayout>
      {/* Step 1: Mobile Number */}
      {step === 1 && (
        <>
          <AuthHeader
            title="Hello!"
            subtitle="Create Your Account with Your Mobile Number"
          />
          <div className="auth-form">
            <FloatingLabelInput
              label="Mobile Number"
              value={mobile}
              onValueChange={setMobile}
              type="tel"
              inputMode="numeric"
              icon={callOutline}
              maxlength={11}
            />
            <IonButton type="button" expand="block" className="app-button-primary mt-20" onClick={handleMobileSubmit}>
              Submit
            </IonButton>
            <div className="ms-footer">
              Already have an account?{" "}
              <span className="form-link" onClick={handleGoLogin}>
                SIGN IN
              </span>
            </div>
          </div>
        </>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <>
          <div className="otp-logo">
            <img src="/flogo1.png" alt="Logo" />
          </div>
          <h2 className="otp-title">Verify Your Mobile Number</h2>
          <p className="otp-subtitle">
            Enter the 6-digit verification code we just sent to your mobile number to continue your signup.
          </p>
          <div className="otp-row">
            {code.map((d, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                className="otp-box"
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                inputMode="numeric"
                maxLength={1}
              />
            ))}
          </div>
          <IonButton expand="block" className="otp-btn" onClick={handleVerify}>
            Verify
          </IonButton>
          {seconds > 0 ? (
            <div className="otp-resend muted">{seconds}s Resend Confirmation Code</div>
          ) : (
            <div className="otp-resend">
              Didn't you receive any code?{" "}
              <span className="ms-link" onClick={handleResend}>
                Resend Code
              </span>
            </div>
          )}
          <div className="back-to-signin" onClick={() => setStep(1)}>
            <IonIcon icon={arrowBack} className="back-icon" />
            <span>Back</span>
          </div>
        </>
      )}

      {/* Step 3: Complete Registration */}
      {step === 3 && (
        <>
          <AuthHeader
            title="Create Account"
            subtitle="Fill out the form to create your account"
          />
          <form className="signup-form">
            <FloatingLabelInput
              label="Full Name"
              value={fullName}
              onValueChange={setFullName}
              icon={person}
            />
            <IonItem lines="none" className="signup-item">
              <IonIcon icon={callOutline} slot="start" />
              <IonInput
                placeholder="Mobile Number"
                type="tel"
                value={mobile}
                readonly
              />
            </IonItem>
            <FloatingLabelInput
              label="Email"
              value={email}
              onValueChange={setEmail}
              type="email"
              icon={mail}
            />
            <FloatingLabelInput
              label="Address"
              value={address}
              onValueChange={setAddress}
              icon={home}
            />
            <FloatingLabelInput
              label="Password"
              value={password}
              onValueChange={setPassword}
              type="password"
            />
            <FloatingLabelInput
              label="Confirm Password"
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              type="password"
            />
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
            <div className="back-to-signin" onClick={handleGoLogin}>
              <IonIcon icon={arrowBack} className="back-icon" />
              <span>Back to Sign In</span>
            </div>
          </form>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={handleAlertDismiss}
            header="Success!"
            message="Registered Successfully!"
            buttons={["OK"]}
          />
        </>
      )}
      <LoadingSpinner isOpen={loading} message="Processing..." />
    </AuthPageLayout>
  );
};

export default MobileSignupPage;
