import { IonModal, IonIcon } from "@ionic/react";
import { busSharp } from "ionicons/icons";
import "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
  isOpen: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isOpen }) => {
  return (
    <IonModal isOpen={isOpen} className="loading-modal" backdropDismiss={false} animated={false}>
      <div className="loading-content">
        <div className="loading-circle">
          <svg className="progress-ring" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2cc06a" />
                <stop offset="100%" stopColor="#0aa03f" />
              </linearGradient>
            </defs>
            <circle className="ring-bg" cx="60" cy="60" r="50" />
            <circle className="ring-progress" cx="60" cy="60" r="50" stroke="url(#greenGrad)" />
          </svg>

          <div className="logo-wrap">
            <div className="map-pin">
              <div className="map-pin-tail" />
              <div className="map-pin-head">
                <div className="map-pin-circle">
                  <IonIcon icon={busSharp} className="bus-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonModal>
  );
};

export default LoadingSpinner;
