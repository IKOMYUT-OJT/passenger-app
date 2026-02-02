import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import {
  notificationsOutline,
  checkmarkCircle,
  informationCircle,
  warning,
  timeOutline,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import "../styles/NotificationPage.css";

interface Notification {
  id: number;
  type: "success" | "info" | "warning";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationPage: React.FC = () => {
  const ionRouter = useIonRouter();

  const notifications: Notification[] = [
    {
      id: 1,
      type: "success",
      title: "Booking Confirmed",
      message: "Your ride has been confirmed. Driver is on the way.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "New Route Available",
      message: "A new bus route is now available in your area.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Payment Reminder",
      message: "Your wallet balance is low. Please top up.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "info",
      title: "App Update",
      message: "A new version of iKomyutPH is available.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 5,
      type: "success",
      title: "Trip Completed",
      message: "Your trip has been completed successfully.",
      time: "2 days ago",
      read: true,
    },
  ];

  const getIconByType = (type: string) => {
    switch (type) {
      case "success":
        return checkmarkCircle;
      case "warning":
        return warning;
      default:
        return informationCircle;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "notification-icon-success";
      case "warning":
        return "notification-icon-warning";
      default:
        return "notification-icon-info";
    }
  };

  return (
    <IonPage>
      <IonHeader className="notification-header">
        <IonToolbar className="notification-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/homepage" />
          </IonButtons>
          <IonTitle className="notification-title">Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={true} className="notification-content">
        <div className="notification-section">All Notifications</div>
        
        <IonList className="notification-list">
          {notifications.map((notification) => (
            <IonItem
              key={notification.id}
              lines="none"
              className={`notification-item ${
                notification.read ? "" : "notification-unread"
              }`}
              button
              detail={false}
            >
              <div className="notification-icon-wrapper" slot="start">
                <IonIcon
                  icon={getIconByType(notification.type)}
                  className={`notification-icon ${getIconColor(notification.type)}`}
                />
              </div>

              <IonLabel className="notification-label">
                <div className="notification-header-row">
                  <h3 className="notification-item-title">{notification.title}</h3>
                  {!notification.read && <IonBadge className="notification-badge">New</IonBadge>}
                </div>
                <p className="notification-message">{notification.message}</p>
                <div className="notification-time">
                  <IonIcon icon={timeOutline} className="time-icon" />
                  <span>{notification.time}</span>
                </div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;
