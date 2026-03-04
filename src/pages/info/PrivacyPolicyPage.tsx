import {
  IonPage,
  IonContent,
} from "@ionic/react";
import { PageHeader } from "../../components/common";
import { ROUTES } from "../../constants";
import "../../styles/info/PrivacyPolicyPage.scss";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <IonPage data-page="privacy">
      <PageHeader title="Privacy Policy" defaultHref={ROUTES.SETTINGS} />

      <IonContent className="privacy-content">
        <div className="privacy-container">
          <h2>Privacy Policy</h2>
          <p className="privacy-update">Last Updated: February 2, 2026</p>

          <section className="privacy-section">
            <h3>1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us, including your name, 
              mobile number, email address, and location data when you use our services.
            </p>
          </section>

          <section className="privacy-section">
            <h3>2. How We Use Your Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our 
              services, process transactions, send you technical notices and support messages.
            </p>
          </section>

          <section className="privacy-section">
            <h3>3. Information Sharing</h3>
            <p>
              We do not share your personal information with third parties except as 
              described in this policy or with your consent.
            </p>
          </section>

          <section className="privacy-section">
            <h3>4. Data Security</h3>
            <p>
              We take reasonable measures to help protect your personal information from 
              loss, theft, misuse, and unauthorized access.
            </p>
          </section>

          <section className="privacy-section">
            <h3>5. Your Rights</h3>
            <p>
              You have the right to access, update, or delete your personal information 
              at any time through your account settings.
            </p>
          </section>

          <section className="privacy-section">
            <h3>6. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at 
              support@ikomyutph.com
            </p>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPolicyPage;