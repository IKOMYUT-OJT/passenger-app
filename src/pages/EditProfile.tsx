import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { PageHeader, ProfileAvatar } from "../components/common";
import { useProfileImage } from "../hooks";
import "../styles/EditProfile.css";

const EditProfile: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const { profileImage, updateProfileImage } = useProfileImage();

  return (
    <IonPage>
      <PageHeader title="Edit Profile" defaultHref="/tabs/profilepage" />

      <IonContent fullscreen scrollY={true} className="page-content">
        <div className="edit-avatar-container">
          <ProfileAvatar
            imageSource={profileImage}
            onImageChange={updateProfileImage}
            size="large"
            showCamera={true}
          />
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

          <IonItem lines="none" className="edit-input">
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
              <IonButton expand="block" className="app-button-secondary">
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" className="app-button-primary">
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