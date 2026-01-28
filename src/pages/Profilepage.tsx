import { useState, useContext } from "react";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonText,
  IonButton,
  IonButtons,
  IonBackButton,
} from "@ionic/react";

import {
  personOutline,
  lockClosedOutline,
  settingsOutline,
  walletOutline,
  logOutOutline,
  chevronForwardOutline,
  pricetagOutline,
  notificationsOutline,
  cardOutline,
  cameraOutline,
} from "ionicons/icons";

import { useIonRouter } from "@ionic/react";
import { AuthContext } from "../App";
import "../styles/Profilepage.css";

const Profilepage: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const ionRouter = useIonRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    ionRouter.push("/", "root");
  };

  return (
    <IonPage>
      <IonHeader className="profile-header-bar">
        <IonToolbar className="profile-toolbar">
          <IonButtons slot="start">
          </IonButtons>
          <IonTitle className="profile-title">My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

<IonContent fullscreen scrollY={false} className="profile-content">
        <div className="profile-header">
          <div className="avatar-wrap">
            <IonAvatar className="profile-avatar">
              <img
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
                alt="Profile"
              />
            </IonAvatar>

            <button className="avatar-camera" type="button" aria-label="Change photo">
              <IonIcon icon={cameraOutline} />
            </button>
          </div>

          <h2 className="profile-name">Mark Parra</h2>
          <p className="profile-number">09123456789</p>
        </div>

        <IonList inset className="profile-list">
          <IonItem
            lines="full"
            button
            className="profile-item"
            onClick={() => ionRouter.push("/edit-profile")}
          >
            <IonIcon icon={personOutline} slot="start" className="profile-icon" />
            <IonLabel>Edit Profile</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="profile-chevron" />
          </IonItem>

          <IonItem lines="full" button className="profile-item">
            <IonIcon
              icon={notificationsOutline}
              slot="start"
              className="profile-icon"
            />
            <IonLabel>Notifications</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="profile-chevron" />
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-item"
            onClick={() => ionRouter.push("/change-password")}
          >
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="profile-icon"
            />
            <IonLabel>Change Password</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="profile-chevron" />
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-item"
            onClick={() => ionRouter.push("/discount")}
          >
            <IonIcon icon={pricetagOutline} slot="start" className="profile-icon" />
            <IonLabel>Discount</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="profile-chevron" />
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-item"
            onClick={() => ionRouter.push("/wallet")}
          >
            <IonIcon icon={walletOutline} slot="start" className="profile-icon" />
            <IonLabel>Wallet</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="profile-chevron" />
          </IonItem>

          <IonItem lines="full" button className="profile-item">
            <IonIcon icon={cardOutline} slot="start" className="profile-icon" />
            <IonLabel>Transaction History</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="profile-chevron" />
          </IonItem>

          <IonItem
            lines="none"
            button
            className="profile-item"
            onClick={() => ionRouter.push("/settings")}
          >
            <IonIcon icon={settingsOutline} slot="start" className="profile-icon" />
            <IonLabel>Settings</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="profile-chevron" />
          </IonItem>

          <IonItem
            lines="none"
            button
            className="profile-item logout-item"
            onClick={() => setShowLogoutModal(true)}
          >
            <IonIcon icon={logOutOutline} slot="start" className="profile-icon danger" />
            <IonLabel className="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>

        <IonModal
          isOpen={showLogoutModal}
          onDidDismiss={() => setShowLogoutModal(false)}
          className="logout-modal-sheet"
        >
          <div className="logout-sheet">
            <div className="logout-handle" />
            <h2 className="logout-title">Log out?</h2>
            <IonText className="logout-sub">
              You’ll need to log in again to access your account.
            </IonText>

            <div className="logout-actions">
              <IonButton
                expand="block"
                fill="outline"
                className="logout-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </IonButton>

              <IonButton
                expand="block"
                color="danger"
                className="logout-confirm"
                onClick={confirmLogout}
              >
                Yes, Log Out
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Profilepage;
