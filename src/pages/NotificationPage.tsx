import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import {
  checkmarkCircle,
  informationCircle,
  warning,
  timeOutline,
} from "ionicons/icons";
import { PageHeader } from "../components/common";
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
      <PageHeader title="Notifications" defaultHref="/tabs/profilepage" />

      <IonContent fullscreen scrollY={true} className="page-content notification-page-content">
        <div className="notification-container">
          <div className="notification-header-section">
            <h3 className="section-title">Recent</h3>
            <button className="mark-all-read">Mark all as read</button>
          </div>

          <div className="notifications-wrapper">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${
                  notification.read ? "notification-read" : "notification-unread"
                }`}
              >
                <div className="notification-icon-container">
                  <div className={`notification-icon-circle ${notification.type}`}>
                    <IonIcon icon={getIconByType(notification.type)} />
                  </div>
                </div>

                <div className="notification-content-wrapper">
                  <div className="notification-top-row">
                    <h4 className="notification-title">{notification.title}</h4>
                    {!notification.read && (
                      <span className="notification-dot"></span>
                    )}
                  </div>
                  <p className="notification-text">{notification.message}</p>
                  <div className="notification-footer">
                    <IonIcon icon={timeOutline} className="notification-time-icon" />
                    <span className="notification-time-text">{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;
