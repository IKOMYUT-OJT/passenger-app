import { IonPage, IonContent } from "@ionic/react";
import { ReactNode, useEffect } from "react";

interface AuthPageLayoutProps {
  children: ReactNode;
  className?: string;
  scrollY?: boolean;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children, className = "", scrollY = true }) => {
  useEffect(() => {
    document.documentElement.classList.remove("ion-palette-dark");
  }, []);

  return (
    <IonPage className="auth-force-light-page">
      <IonContent fullscreen className={`auth-page-content auth-force-light ${className}`} scrollY={scrollY}>
        <div className="auth-page-container">
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthPageLayout;
