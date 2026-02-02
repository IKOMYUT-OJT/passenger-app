import { useState, useContext, useRef, useEffect } from "react";
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
  locationOutline,
  documentTextOutline,
} from "ionicons/icons";

import { useIonRouter } from "@ionic/react";
import { AuthContext } from "../App";
import "../styles/Profilepage.css";

const Profilepage: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || "man.png";
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ionRouter = useIonRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const handleProfileImageUpdate = () => {
      const updatedImage = localStorage.getItem("profileImage") || "man.png";
      setProfileImage(updatedImage);
    };

    window.addEventListener("profileImageUpdated", handleProfileImageUpdate);
    return () => {
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdate);
    };
  }, []);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setProfileImage(imageData);
        localStorage.setItem("profileImage", imageData);
        window.dispatchEvent(new Event("profileImageUpdated"));
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
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

<IonContent fullscreen scrollY={true} className="profile-content">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div className="profile-header">
          <div className="avatar-wrap">
            <IonAvatar className="profile-avatar">
              <img
                src={profileImage}
                alt="Profile"
              />
            </IonAvatar>

            <button className="avatar-camera" type="button" aria-label="Change photo" onClick={handleCameraClick}>
              <IonIcon icon={cameraOutline} />
            </button>
          </div>

          <h2 className="profile-name">Mark Parra</h2>
          <p className="profile-number">PASSENGER</p>
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

          <IonItem
            lines="full"
            button
            className="profile-item"
            onClick={() => ionRouter.push("/address")}
          >
            <IonIcon icon={locationOutline} slot="start" className="profile-icon" />
            <IonLabel>Address</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="profile-chevron" />
          </IonItem>

          <IonItem
            lines="full"
            button
            className="profile-item"
            onClick={() => ionRouter.push("/notifications")}
          >
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


          <IonItem
            lines="full"
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
            <IonLabel className="danger">Logout</IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" className="profile-chevron danger" />
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
