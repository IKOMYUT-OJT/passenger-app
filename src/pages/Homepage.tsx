import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '../styles/Homepage.css';
import { add, notifications, notificationsOutline } from 'ionicons/icons';

const Homepage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonFab slot="fixed" vertical="top" horizontal="end">
          
        </IonFab>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
