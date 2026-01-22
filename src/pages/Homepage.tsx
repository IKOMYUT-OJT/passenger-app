import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Homepage.css';
import { add, notifications, notificationsOutline } from 'ionicons/icons';

const Homepage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonFab slot="fixed" vertical="top" horizontal="end">
          <IonFabButton size='small'>
            <IonIcon icon={notifications}></IonIcon>
          </IonFabButton>
        </IonFab>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
