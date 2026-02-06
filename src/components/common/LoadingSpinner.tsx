import { IonModal } from "@ionic/react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  isOpen: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isOpen,
  message = "Please wait...",
}) => {
  return (
    <IonModal isOpen={isOpen} cssClass="loading-modal" backdropDismiss={false}>
      <div className="loading-content">
        <div className="loading-circle">
          <svg className="progress-ring" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="greenGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#2cc06a" />
                <stop offset="100%" stopColor="#0aa03f" />
              </linearGradient>
            </defs>
            <circle className="ring-bg" cx="60" cy="60" r="50" />
            <circle className="ring-progress" cx="60" cy="60" r="50" stroke="url(#greenGrad)" />
          </svg>

          <div className="logo-wrap">
            <div className="logo-inner">
              <img src="/welcomelogo.png" alt="Loading" className="loading-logo" />
            </div>
          </div>
        </div>

        <p className="loading-message">{message}</p>
      </div>
    </IonModal>
  );
};

export default LoadingSpinner;
