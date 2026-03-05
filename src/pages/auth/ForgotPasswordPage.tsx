import { IonButton, IonIcon, useIonToast, useIonRouter } from "@ionic/react";
import { useState, useEffect, useMemo } from "react";
import { arrowBack, mailOutline, lockClosed } from "ionicons/icons";
import { AuthPageLayout, AuthHeader, FloatingLabelInput, LoadingSpinner } from "../../components/common";
import { ROUTES } from "../../constants";
import "../../styles/auth/SignupPage.scss";
import "../../styles/auth/ForgotPasswordPage.scss";

const ForgotPasswordPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [presentToast] = useIonToast();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(20);
  const otpValue = useMemo(() => code.join(""), [code]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (step !== 2 || seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, step]);

  const handleSend = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      presentToast({ message: "Please enter a valid email address.", duration: 2500, color: "danger", position: "top" });
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

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      (document.getElementById(`reset-otp-${idx - 1}`) as HTMLInputElement | null)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length === 0) return;
    const next = Array(6).fill("").map((_: string, i: number) => digits[i] ?? "");
    setCode(next);
    const lastFilled = Math.min(digits.length, 5);
    (document.getElementById(`reset-otp-${lastFilled}`) as HTMLInputElement | null)?.focus();
  };

  const handleVerify = () => {
    if (otpValue.length !== 6) {
      presentToast({ message: "Please enter the 6-digit code.", duration: 2500, color: "danger", position: "top" });
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
      presentToast({ message: "Please fill in all fields.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    if (newPassword !== confirmPassword) {
      presentToast({ message: "Passwords do not match.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    if (newPassword.length < 6) {
      presentToast({ message: "Password must be at least 6 characters.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      presentToast({ message: "Password reset successful!", duration: 2000, color: "success", position: "top" });
      setTimeout(() => {
        window.location.href = ROUTES.LOGIN;
      }, 2100);
    }, 1500);
  };

  return (
    <AuthPageLayout scrollY={step !== 2} className={step === 2 ? "signup-layout" : ""}>
      {step === 1 && (
        <>
          <AuthHeader
            title="Forgot Password"
            subtitle="Enter your email to receive a verification code"
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
            <IonButton expand="block" className="otp-btn mt-20" onClick={handleSend}>
              Send
            </IonButton>
            <div className="back-to-signin" onClick={() => ionRouter.push(ROUTES.LOGIN, "back")}>
              <IonIcon icon={arrowBack} className="back-icon" />
              <span>Back to Sign In</span>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <AuthHeader
            title="Verification"
            subtitle="Enter the 6-digit verification code we just sent to your email to continue."
          />
          <div className="otp-row">
            {code.map((d, i) => (
              <input
                key={i}
                id={`reset-otp-${i}`}
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
          <IonButton expand="block" className="otp-btn" onClick={handleVerify}>
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
            <span>back to Forgot Password</span>
          </div>
        </>
      )}

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
              icon={lockClosed}
            />
            <FloatingLabelInput
              label="Confirm Password"
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              type="password"
              icon={lockClosed}
            />
            <IonButton expand="block" className="otp-btn" onClick={handleResetPassword}>
              Reset Password
            </IonButton>
            <div className="back-to-signin" onClick={() => ionRouter.push(ROUTES.LOGIN, "back")}>
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