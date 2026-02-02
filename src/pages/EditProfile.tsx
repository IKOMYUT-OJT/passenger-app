import { useState, useRef, useEffect } from "react";
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
import { eyeOutline, eyeOffOutline, cameraOutline, add } from "ionicons/icons";
import "../styles/EditProfile.css";

const EditProfile: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || "man.png";
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <IonPage>
      <IonHeader className="edit-profile-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/profilepage" />
          </IonButtons>

          <IonTitle className="edit-profile-title">Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={true} className="edit-profile-content">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div className="edit-avatar-wrapper" onClick={handleCameraClick} style={{ cursor: 'pointer' }}>
          <IonAvatar className="edit-avatar">
            <img
              src={profileImage}
              alt="Avatar"
            />
          </IonAvatar>
          <IonIcon icon={cameraOutline} className="camera-icon" />
        </div>

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
              placeholder="Email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
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
              placeholder="Address"
              value={address}
              onIonChange={(e) => setAddress(e.detail.value!)}
            />
            
          </IonItem>
        </div>
        
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
