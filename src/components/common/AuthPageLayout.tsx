import { IonPage, IonContent } from "@ionic/react";
import { ReactNode } from "react";

interface AuthPageLayoutProps {
  children: ReactNode;
  className?: string;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children, className = "" }) => {
  return (
    <IonPage>
      <IonContent fullscreen className={`auth-page-content ${className}`} scrollY={true}>
        <div className="auth-page-container">
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthPageLayout;
