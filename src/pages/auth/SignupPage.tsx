import { IonButton, IonIcon, IonText, IonAlert, useIonToast, useIonRouter } from "@ionic/react";
import { useState, useMemo, useEffect } from "react";
import { arrowBack, person, mail, atOutline, lockClosed, callOutline } from "ionicons/icons";
import { AuthPageLayout, AuthHeader, FloatingLabelInput, LoadingSpinner } from "../../components/common";
import { ROUTES } from "../../constants";
import "../../styles/auth/SignupPage.scss";

const SignupPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [presentToast] = useIonToast();

  const [step, setStep] = useState(1);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const otpValue = useMemo(() => code.join(""), [code]);

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step !== 2 || seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, step]);

  const handleRegister = () => {
    setError("");
    if (!fullName || !email || !mobile || !username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const mobileClean = mobile.replace(/\s+/g, "");
    if (mobileClean.length < 11) {
      setError("Please enter a valid 11-digit mobile number.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCode(["", "", "", "", "", ""]);
      setSeconds(30);
      setStep(2);
    }, 1200);
  };

  const setDigit = (idx: number, val: string) => {
    const v = (val ?? "").replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[idx] = v;
      return next;
    });
    if (v && idx < 5) {
      (document.getElementById(`signup-otp-${idx + 1}`) as HTMLInputElement | null)?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      (document.getElementById(`signup-otp-${idx - 1}`) as HTMLInputElement | null)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length === 0) return;
    const next = Array(6).fill("").map((_: string, i: number) => digits[i] ?? "");
    setCode(next);
    const lastFilled = Math.min(digits.length, 5);
    (document.getElementById(`signup-otp-${lastFilled}`) as HTMLInputElement | null)?.focus();
  };

  const handleVerifyOtp = () => {
    if (otpValue.length !== 6) {
      presentToast({ message: "Please enter the complete 6-digit code.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAlert(true);
    }, 1200);
  };

  const handleResend = () => {
    setSeconds(30);
    setCode(["", "", "", "", "", ""]);
    setTimeout(() => {
      (document.getElementById("signup-otp-0") as HTMLInputElement | null)?.focus();
    }, 100);
    presentToast({ message: "A new code has been sent to your mobile number.", duration: 2500, color: "success", position: "top" });
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    localStorage.removeItem("isLoggedIn");
    ionRouter.push(ROUTES.LOGIN, "back");
  };

  const handleGoLogin = () => ionRouter.push(ROUTES.LOGIN, "back");

  return (
    <AuthPageLayout scrollY={false} className="signup-layout">
      {step === 1 && (
        <>
          <AuthHeader
            title="Hello!"
            subtitle="Fill out the form to create your account"
          />
          <form
            className="signup-form"
            autoComplete="off"
            onSubmit={(e) => { e.preventDefault(); handleRegister(); }}
          >
            <FloatingLabelInput
              label="Full Name"
              value={fullName}
              onValueChange={setFullName}
              icon={person}
              placeholder="Juan Dela Cruz"
              autocomplete="off"
            />
            <FloatingLabelInput
              label="Mobile Number"
              value={mobile}
              onValueChange={setMobile}
              type="tel"
              inputMode="numeric"
              icon={callOutline}
              maxlength={11}
              placeholder="09123456789"
              autocomplete="off"
            />
            <FloatingLabelInput
              label="Email"
              value={email}
              onValueChange={setEmail}
              type="email"
              inputMode="email"
              icon={mail}
              placeholder="you@example.com"
              autocomplete="off"
            />
            <FloatingLabelInput
              label="Username"
              value={username}
              onValueChange={setUsername}
              icon={atOutline}
              autocomplete="off"
            />
            <FloatingLabelInput
              label="Password"
              value={password}
              onValueChange={setPassword}
              type="password"
              icon={lockClosed}
              autocomplete="new-password"
            />
            <FloatingLabelInput
              label="Confirm Password"
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              type="password"
              icon={lockClosed}
              autocomplete="new-password"
            />
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to terms of service policy
              </label>
            </div>
            {error && (
              <IonText color="danger" className="signup-error">
                {error}
              </IonText>
            )}
            <IonButton
              expand="block"
              type="submit"
              className="signup-button"
            >
              Sign Up
            </IonButton>
            <div className="back-to-signin" onClick={handleGoLogin}>
              <IonIcon icon={arrowBack} className="back-icon" />
              <span>Back to Sign In</span>
            </div>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <AuthHeader
            title="Verification"
            subtitle="Enter the 6-digit verification code we just sent to your mobile number to continue your signup."
          />
          <div className="otp-row">
            {code.map((d, i) => (
              <input
                key={i}
                id={`signup-otp-${i}`}
                className="otp-box"
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                inputMode="numeric"
                maxLength={1}
                autoFocus={i === 0}
              />
            ))}
          </div>
          <IonButton expand="block" className="otp-btn" onClick={handleVerifyOtp}>
            Verify
          </IonButton>
          <div className="otp-resend">
            {seconds > 0 ? (
              <span className="muted">{seconds}s Resend Confirmation Code</span>
            ) : (
              <>
                Didn't receive a code?{" "}
                <span className="ms-link" onClick={handleResend}>
                  Resend Code
                </span>
              </>
            )}
          </div>
          <div className="back-to-signin" onClick={() => setStep(1)}>
            <IonIcon icon={arrowBack} className="back-icon" />
            <span>back to Sign Up</span>
          </div>
        </>
      )}

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={handleAlertDismiss}
        header="Registration Successful!"
        message={`Your account has been created. Please log in using your email: ${email}`}
        buttons={[{ text: "Go to Login", handler: handleAlertDismiss }]}
      />

      <LoadingSpinner isOpen={loading} message="Processing..." />
    </AuthPageLayout>
  );
};

export default SignupPage;
