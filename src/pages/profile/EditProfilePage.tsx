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
  useIonToast,
} from "@ionic/react";
import { PageHeader, ProfileAvatar } from "../../components/common";
import { useProfileImage } from "../../hooks";
import { ROUTES } from "../../constants";
import "../../styles/profile/EditProfilePage.scss";

const EditProfile: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const { profileImage, updateProfileImage } = useProfileImage();
  const [presentToast] = useIonToast();

  const handleSave = () => {
    if (!fullName || !email || !mobile || !address) {
      presentToast({ message: "Please fill in all fields.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    presentToast({ message: "Profile saved successfully!", duration: 2500, color: "success", position: "top" });
  };

  return (
    <IonPage data-page="editprofile">
      <PageHeader title="Edit Profile" defaultHref={ROUTES.TABS_PROFILE} />

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
              <IonButton expand="block" className="app-button-primary" onClick={handleSave}>
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