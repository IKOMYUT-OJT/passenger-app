import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonAvatar,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { eyeOutline, eyeOffOutline, cameraOutline } from "ionicons/icons";
import "../styles/EditProfile.css";

const EditProfile: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader className="edit-profile-header">
        <IonToolbar>
          <IonButtons slot="start">
            {/* remove Back text */}
            <IonBackButton text="" defaultHref="/tabs/profilepage" />
          </IonButtons>

          {/* left aligned title */}
          <IonTitle className="edit-profile-title">Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* CONTENT */}
      <IonContent fullscreen scrollY={false} className="edit-profile-content">
        {/* Avatar */}
        <div className="edit-avatar-wrapper">
          <IonAvatar className="edit-avatar">
            <img
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
              alt="Avatar"
            />
          </IonAvatar>
          <IonIcon icon={cameraOutline} className="camera-icon" />
        </div>

        {/* Form */}
        <div className="edit-form">
          <IonItem lines="none" className="edit-input">
            <IonInput
              placeholder="Full Name"
              value={fullName}
              onIonChange={(e) => setFullName(e.detail.value!)}
            />
          </IonItem>

          <IonItem lines="none" className="edit-input">
            <IonInput
              placeholder="Username"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            />
          </IonItem>

          <IonItem lines="none" className="edit-input">
            <IonInput
              placeholder="Mobile Number"
              value={mobile}
              onIonChange={(e) => setMobile(e.detail.value!)}
            />
          </IonItem>

          <IonItem lines="none" className="edit-input password-input">
            <IonInput
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
            <IonIcon
              icon={showPassword ? eyeOffOutline : eyeOutline}
              slot="end"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            />
          </IonItem>
        </div>

        {/* Buttons */}
        <IonGrid className="edit-actions">
          <IonRow>
            <IonCol>
              <IonButton expand="block" className="cancel-btn">
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" className="save-btn">
                Save changes
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
