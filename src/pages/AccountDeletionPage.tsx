import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonModal,
  IonIcon,
} from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import "../styles/AccountDeletionPage.css";

const AccountDeletionPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteAccount = () => {
    setShowConfirmModal(false);
    ionRouter.push("/login");
  };

  return (
    <IonPage>
      <IonHeader className="deletion-header">
        <IonToolbar className="deletion-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/settings" />
          </IonButtons>
          <IonTitle className="deletion-title">Account Deletion</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="deletion-content">
        <div className="deletion-container">
          <div className="deletion-warning-icon">
            <IonIcon icon={warningOutline} />
          </div>

          <h2>Delete Your Account</h2>
          <p className="deletion-subtitle">
            This action cannot be undone. Please read carefully before proceeding.
          </p>

          <div className="deletion-info">
            <h3>What happens when you delete your account:</h3>
            <ul>
              <li>All your personal information will be permanently deleted</li>
              <li>Your ride history will be removed</li>
              <li>Any remaining wallet balance will be forfeited</li>
              <li>Active bookings will be cancelled</li>
              <li>You will lose access to all discounts and benefits</li>
              <li>This action cannot be reversed</li>
            </ul>
          </div>

          <div className="deletion-alternative">
            <h3>Alternative Options</h3>
            <p>
              If you're experiencing issues with your account, please contact our 
              support team at support@ikomyutph.com. We're here to help!
            </p>
          </div>

          <IonButton
            expand="block"
            color="danger"
            className="deletion-button"
            onClick={() => setShowConfirmModal(true)}
          >
            Delete My Account
          </IonButton>
        </div>

        <IonModal
          isOpen={showConfirmModal}
          onDidDismiss={() => setShowConfirmModal(false)}
          className="deletion-modal"
        >
          <div className="deletion-modal-content">
            <div className="deletion-modal-icon">
              <IonIcon icon={warningOutline} />
            </div>
            <h2>Are you absolutely sure?</h2>
            <p>This will permanently delete your account and all associated data.</p>
            <div className="deletion-modal-buttons">
              <IonButton
                expand="block"
                fill="outline"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </IonButton>
              <IonButton
                expand="block"
                color="danger"
                onClick={handleDeleteAccount}
              >
                Yes, Delete My Account
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AccountDeletionPage;