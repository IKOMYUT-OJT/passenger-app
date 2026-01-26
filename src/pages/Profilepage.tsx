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
} from "@ionic/react";
import {
  personOutline,
  notificationsOutline,
  lockClosedOutline,
  settingsOutline,
  walletOutline,
  timeOutline,
  logOutOutline,
  chevronForwardOutline,
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
      {/* HEADER */}
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="edit-profile-title">My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* CONTENT */}
      <IonContent fullscreen scrollY={false} className="edit-profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <IonAvatar className="profile-avatar">
            <img
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
              alt="Profile"
            />
          </IonAvatar>
          <h2 className="profile-name">Mark Parra</h2>
          <p className="profile-number">09123456789</p>
        </div>

        {/* Profile List */}
        <IonList inset className="profile-list">
          <IonItem button onClick={() => ionRouter.push("/edit-profile")}>
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel>Edit Profile</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={notificationsOutline} slot="start" />
            <IonLabel>Notifications</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={lockClosedOutline} slot="start" />
            <IonLabel>Change Password</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button onClick={() => ionRouter.push("/settings")}>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Settings</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={walletOutline} slot="start" />
            <IonLabel>Wallet</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button>
            <IonIcon icon={timeOutline} slot="start" />
            <IonLabel>Transaction History</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button onClick={() => setShowLogoutModal(true)}>
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>

        {/* Logout Modal */}
        <IonModal
          isOpen={showLogoutModal}
          onDidDismiss={() => setShowLogoutModal(false)}
        >
          <div className="logout-modal">
            <h2>Confirm Logout</h2>
            <IonText>Are you sure you want to log out?</IonText>

            <div className="logout-actions">
              <IonButton
                fill="outline"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </IonButton>
              <IonButton color="danger" onClick={confirmLogout}>
                Yes
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Profilepage;
