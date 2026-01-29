import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { useIonRouter } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import "../styles/MobileSignup.css";

const VerifyOtpPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [mobile] = useState(() => localStorage.getItem("pendingMobile") ?? "");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(20);
  const otpValue = useMemo(() => code.join(""), [code]);

  useEffect(() => {
    if (!mobile) {
      ionRouter.push("/signup", "back");
    }
  }, [mobile, ionRouter]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

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
    localStorage.setItem("verifiedMobile", mobile);
    ionRouter.push("/signup/details", "forward");
  };

  const handleResend = () => {
    setSeconds(20);
    setCode(["", "", "", "", "", ""]);
    (document.getElementById("otp-0") as HTMLInputElement | null)?.focus();
  };

  return (
    <IonPage>
      <IonContent fullscreen className="otp-content">
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
              Didn’t you receive any code?{" "}
              <span className="ms-link" onClick={handleResend}>
                Resend Code
              </span>
            </div>
          )}
           <div className="back-to-signin" onClick={() => ionRouter.push("/login", "back")}>
            <IonIcon icon={arrowBack} className="back-icon" />
            <span>Back to Sign In</span>
          </div>

      </IonContent>
    </IonPage>
  );
};

export default VerifyOtpPage;
