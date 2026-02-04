import { useState, useContext } from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonModal,
  IonText,
  IonButton,
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
  locationOutline,
} from "ionicons/icons";

import { useIonRouter } from "@ionic/react";
import { AuthContext } from "../App";
import { PageHeader, ProfileAvatar } from "../components/common";
import { useProfileImage } from "../hooks";
import "../styles/Profilepage.css";

const Profilepage: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { profileImage, updateProfileImage } = useProfileImage();
  const ionRouter = useIonRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <IonPage>
      <PageHeader title="My Profile" showBackButton={false} />

      <IonContent fullscreen scrollY={true} className="page-content">
        <div className="profile-header">
          <ProfileAvatar
            imageSource={profileImage}
            onImageChange={updateProfileImage}
            size="large"
            showCamera={false}
          />

          <h2 className="profile-name">Mark Parra</h2>
          <p className="profile-number">PASSENGER</p>
        </div>

        <IonList inset className="profile-list">
          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push("/edit-profile")}
          >
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel>Edit Profile</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="chevron" default={false}/>
            
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push("/address")}
          >
            <IonIcon icon={locationOutline} slot="start" />
            <IonLabel>Address</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="chevron" />
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push("/notifications")}
          >
            <IonIcon
              icon={notificationsOutline}
              slot="start"
            />
            <IonLabel>Notifications</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="chevron" />
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push("/discount")}
          >
            <IonIcon icon={pricetagOutline} slot="start" />
            <IonLabel>Discount</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="chevron" />
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push("/wallet")}
          >
            <IonIcon icon={walletOutline} slot="start" />
            <IonLabel>Wallet</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="chevron" />
          </IonItem>


          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push("/settings")}
          >
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Settings</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="chevron" />
          </IonItem>

          <IonItem
            lines="none"
            button
            className="profile-list-item logout-item"
            onClick={() => setShowLogoutModal(true)}
          >
            <IonIcon icon={logOutOutline} slot="start" className="danger" />
            <IonLabel className="danger">Logout</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="chevron danger" />
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
              You'll need to log in again to access your account.
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
