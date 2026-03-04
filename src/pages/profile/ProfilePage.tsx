
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
  useIonRouter,
} from "@ionic/react";
import {
  personOutline,
  settingsOutline,
  walletOutline,
  logOutOutline,
  pricetagOutline,
  notificationsOutline,
  locationOutline,
} from "ionicons/icons";
import { AuthContext } from "../../contexts/AuthContext";
import { PageHeader, ProfileAvatar } from "../../components/common";
import { useProfileImage } from "../../hooks";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { ROUTES } from "../../constants";
import "../../styles/profile/ProfilePage.scss";

const ProfilePage: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { profileImage, updateProfileImage } = useProfileImage();
  const ionRouter = useIonRouter();
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setDarkMode } = useDarkMode();

  const confirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("darkMode");
    setDarkMode(false);
    document.documentElement.classList.remove("ion-palette-dark");
    document.documentElement.removeAttribute("class");
    setIsLoggedIn(false);
    document.body.style.background = "#ffffff";
    setTimeout(() => {
      document.documentElement.classList.remove("ion-palette-dark");
      window.location.href = ROUTES.LOGIN;
    }, 100);
  };

  return (
    <IonPage data-page="profile">
      <PageHeader title="My Profile" showBackButton={false} />

      <IonContent fullscreen scrollY={true} className="page-content profile-page-content">
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

        <IonList inset className="profile-list" >
          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push(ROUTES.EDIT_PROFILE) }
            
          >
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel>Edit Profile</IonLabel>
            
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push(ROUTES.ADDRESS)}
          >
            <IonIcon icon={locationOutline} slot="start" />
            <IonLabel>Address</IonLabel>
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push(ROUTES.NOTIFICATIONS)}
          >
            <IonIcon
              icon={notificationsOutline}
              slot="start"
            />
            <IonLabel>Notifications</IonLabel>
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push(ROUTES.DISCOUNT)}
          >
            <IonIcon icon={pricetagOutline} slot="start" />
            <IonLabel>Discount</IonLabel>
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push(ROUTES.WALLET)}
          >
            <IonIcon icon={walletOutline} slot="start" />
            <IonLabel>Wallet</IonLabel>
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-list-item"
            onClick={() => ionRouter.push(ROUTES.SETTINGS)}
          >
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Settings</IonLabel>
          </IonItem>

          <IonItem
            lines="none"
            button
            className="profile-list-item logout-item"
            onClick={() => setShowLogoutModal(true)}
          >
            <IonIcon icon={logOutOutline} slot="start" className="danger" />
            <IonLabel className="danger">Logout</IonLabel>
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

export default ProfilePage;
