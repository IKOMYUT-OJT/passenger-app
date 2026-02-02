import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
} from "@ionic/react";
import "../styles/AboutPage.css";

const AboutPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="about-header">
        <IonToolbar className="about-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/settings" />
          </IonButtons>
          <IonTitle className="about-title">About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="about-content">
        <div className="about-container">
          <div className="about-logo">
            <img src="flogo1.png" alt="iKomyutPH Logo" />
          </div>

          <h1 className="about-app-name">iKomyutPH</h1>
          <p className="about-version">Version 4.4.2</p>

          <section className="about-section">
            <h3>About the App</h3>
            <p>
              iKomyutPH is a modern public transportation app designed to make 
              commuting easier and more convenient for Filipinos. We provide 
              seamless booking, real-time tracking, and cashless payments for 
              public transportation.
            </p>
          </section>

          <section className="about-section">
            <h3>Our Mission</h3>
            <p>
              To revolutionize public transportation in the Philippines by 
              providing accessible, efficient, and user-friendly digital solutions 
              that improve the daily commute of millions of Filipinos.
            </p>
          </section>

          <section className="about-section">
            <h3>Features</h3>
            <ul>
              <li>QR Code scanning for quick boarding</li>
              <li>Real-time bus tracking</li>
              <li>Digital wallet integration</li>
              <li>Discount programs for students, seniors, and PWDs</li>
              <li>Ride history and receipts</li>
              <li>24/7 customer support</li>
            </ul>
          </section>

          <section className="about-section">
            <h3>Contact Information</h3>
            <p>
              Email: support@ikomyutph.com<br />
              Phone: 0912-345-6789<br />
              Website: www.ikomyutph.com
            </p>
          </section>

          <section className="about-section">
            <h3>Legal</h3>
            <p>
              © 2026 iKomyutPH. All rights reserved.<br />
              Terms of Service | Privacy Policy
            </p>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;