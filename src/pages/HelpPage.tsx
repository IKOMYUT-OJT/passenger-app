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
  IonAccordionGroup,
  IonAccordion,
} from "@ionic/react";
import {
  helpCircleOutline,
  callOutline,
  mailOutline,
  chatbubbleEllipsesOutline,
} from "ionicons/icons";
import "../styles/HelpPage.css";

const HelpPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="help-header">
        <IonToolbar className="help-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/settings" />
          </IonButtons>
          <IonTitle className="help-title">Help</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="help-content">
        <div className="help-section-label">Frequently Asked Questions</div>
        
        <IonAccordionGroup className="help-accordion-group">
          <IonAccordion value="faq1">
            <IonItem slot="header" className="help-accordion-header">
              <IonLabel>How do I book a ride?</IonLabel>
            </IonItem>
            <div className="help-accordion-content" slot="content">
              To book a ride, simply scan the QR code on the bus or at the bus stop, 
              select your destination, and confirm your booking.
            </div>
          </IonAccordion>

          <IonAccordion value="faq2">
            <IonItem slot="header" className="help-accordion-header">
              <IonLabel>How do I add money to my wallet?</IonLabel>
            </IonItem>
            <div className="help-accordion-content" slot="content">
              Go to Wallet in your profile, tap "Top Up", choose your payment method, 
              and enter the amount you want to add.
            </div>
          </IonAccordion>

          <IonAccordion value="faq3">
            <IonItem slot="header" className="help-accordion-header">
              <IonLabel>What payment methods are accepted?</IonLabel>
            </IonItem>
            <div className="help-accordion-content" slot="content">
              We accept credit/debit cards, GCash, PayMaya, and bank transfers.
            </div>
          </IonAccordion>

          <IonAccordion value="faq4">
            <IonItem slot="header" className="help-accordion-header">
              <IonLabel>How do I apply for discounts?</IonLabel>
            </IonItem>
            <div className="help-accordion-content" slot="content">
              Go to Discount in your profile, select your discount category (Student, 
              Senior, PWD), and submit the required documents for verification.
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        <div className="help-section-label" style={{ marginTop: '24px' }}>Contact Support</div>
        
        <IonList className="help-contact-list">
          <IonItem lines="full" button className="help-contact-item">
            <IonIcon icon={callOutline} slot="start" className="help-icon" />
            <IonLabel>
              <div className="help-contact-label">Phone Support</div>
              <div className="help-contact-value">0912-345-6789</div>
            </IonLabel>
          </IonItem>

          <IonItem lines="full" button className="help-contact-item">
            <IonIcon icon={mailOutline} slot="start" className="help-icon" />
            <IonLabel>
              <div className="help-contact-label">Email Support</div>
              <div className="help-contact-value">support@ikomyutph.com</div>
            </IonLabel>
          </IonItem>

          <IonItem lines="none" button className="help-contact-item">
            <IonIcon icon={chatbubbleEllipsesOutline} slot="start" className="help-icon" />
            <IonLabel>
              <div className="help-contact-label">Live Chat</div>
              <div className="help-contact-value">Available 24/7</div>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HelpPage;