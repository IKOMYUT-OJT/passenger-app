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
    <IonModal
      isOpen={isOpen}
      cssClass="loading-modal"
      backdropDismiss={false}
    >
      <div className="loading-content">
        <div className="loading-logo-container">
          <img src="/welcomelogo.png" alt="Loading" className="loading-logo" />
          <div className="loading-spinner-ring"></div>
        </div>
        <p className="loading-message">{message}</p>
      </div>
    </IonModal>
  );
};

export default LoadingSpinner;
