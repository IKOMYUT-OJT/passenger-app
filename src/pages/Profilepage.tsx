import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { settingsOutline, createOutline, logOutOutline, moonOutline } from 'ionicons/icons';
import './Profilepage.css';

const Profilepage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent className="ion-no-border">
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Profile Card */}
        <IonCard className="profile-card">
          <IonCardContent className="profile-card-content">
            <IonAvatar className="profile-avatar">
              <img
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
                alt="Profile"
              />
            </IonAvatar>

            <h2 className="profile-name">John Doe</h2>
            <p className="profile-email">john.doe@example.com</p>

            <IonButton shape="round" fill="outline" size="small" color="dark">
              Edit Profile
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Settings List */}
        <IonList inset>
          <IonItem button detail={false}>
            <IonIcon icon={createOutline} slot="start" />
            <IonLabel>Edit Information</IonLabel>
          </IonItem>

          <IonItem button detail={false}>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Account Settings</IonLabel>
          </IonItem>

          <IonItem button detail={false}>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
          </IonItem>

          <IonItem button detail={false} className="logout-item">
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profilepage;
