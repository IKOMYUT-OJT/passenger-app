import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import "../styles/WelcomePage.css";

const WelcomePage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/login");
    }, 5500);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="welcome-content">
        <div className="welcome-container">
          <div className="bus-animation">
            <img src="/bus1.png" alt="Bus" />
          </div>
          <div className="welcome-logo">
            <img src="/welcomelogo.png" alt="iKomyutPH Logo" />
          </div>
          <div className="welcome-text">
            <span className="letter letter-1">i</span>
            <span className="letter letter-2">K</span>
            <span className="letter letter-3">o</span>
            <span className="letter letter-4">m</span>
            <span className="letter letter-5">y</span>
            <span className="letter letter-6">u</span>
            <span className="letter letter-7">t</span>
            <span className="letter red-letter letter-8">P</span>
            <span className="letter red-letter letter-9">H</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
