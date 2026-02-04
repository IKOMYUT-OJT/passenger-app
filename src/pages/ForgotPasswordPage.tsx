import { IonButton, IonIcon } from "@ionic/react";
import { useState, useEffect, useMemo } from "react";
import { useIonRouter } from "@ionic/react";
import { arrowBack, callOutline } from "ionicons/icons";
import { AuthPageLayout, AuthHeader, FloatingLabelInput, LoadingSpinner } from "../components/common";
import "../styles/MobileSignup.css";
import "../styles/ForgotPasswordPage.css";

const ForgotPasswordPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [step, setStep] = useState(1); // 1=mobile, 2=otp, 3=new password
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(20);
  const otpValue = useMemo(() => code.join(""), [code]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (step === 2 && seconds <= 0) return;
    if (step === 2) {
      const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [seconds, step]);

  const handleSend = () => {
    if (!mobileNumber || mobileNumber.length < 11) {
      alert("Please enter a valid 11-digit mobile number.");
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
      (document.getElementById(`reset-otp-${idx + 1}`) as HTMLInputElement | null)?.focus();
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
    (document.getElementById("reset-otp-0") as HTMLInputElement | null)?.focus();
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Password reset successful!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    }, 1500);
  };

  return (
    <AuthPageLayout>
      {/* Step 1: Enter Mobile Number */}
      {step === 1 && (
        <>
          <AuthHeader
            title="Forgot Password"
            subtitle="Enter your mobile number to receive a verification code"
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
            <IonButton expand="block" className="app-button-primary mt-20" onClick={handleSend}>
              Send
            </IonButton>
            <div className="back-to-signin" onClick={() => ionRouter.push("/login", "back")}>
              <IonIcon icon={arrowBack} className="back-icon" />
              <span>Back to Sign In</span>
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
            Enter the 6-digit verification code we just sent to your mobile number.
          </p>
          <div className="otp-row">
            {code.map((d, i) => (
              <input
                key={i}
                id={`reset-otp-${i}`}
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

      {/* Step 3: Create New Password */}
      {step === 3 && (
        <>
          <AuthHeader
            title="Create New Password"
            subtitle="Enter your new password"
          />
          <div className="auth-form">
            <FloatingLabelInput
              label="New Password"
              value={newPassword}
              onValueChange={setNewPassword}
              type="password"
            />
            <FloatingLabelInput
              label="Confirm Password"
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              type="password"
            />
            <IonButton expand="block" className="reset-password-btn" onClick={handleResetPassword}>
              Reset Password
            </IonButton>
            <div className="back-to-signin" onClick={() => ionRouter.push("/login", "back")}>
              <span>Back to Sign In</span>
            </div>
          </div>
        </>
      )}
      <LoadingSpinner isOpen={loading} message="Processing..." />
    </AuthPageLayout>
  );
};

export default ForgotPasswordPage;