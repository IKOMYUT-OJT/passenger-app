import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  defaultHref?: string;
  className?: string;
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  defaultHref,
  className = "",
  onBack,
}) => {
  return (
    <IonHeader className={`page-header ${className}`}>
      <IonToolbar className="page-toolbar">
        {showBackButton && (
          <IonButtons slot="start">
            {onBack ? (
              <IonButton onClick={onBack}>
                <IonIcon icon={arrowBack} />
              </IonButton>
            ) : (
              <IonBackButton text="" defaultHref={defaultHref} />
            )}
          </IonButtons>
        )}
        <IonTitle className="page-title">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
