import { useRef, useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonModal,
  IonIcon,
  useIonToast,
  useIonRouter,
} from "@ionic/react";
import { schoolOutline, accessibilityOutline, peopleOutline, chevronDownOutline } from "ionicons/icons";
import { PageHeader } from "../../components/common";
import { ROUTES } from "../../constants";
import "../../styles/features/DiscountPage.scss";

const DiscountPage: React.FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const ionRouter = useIonRouter();
  const [presentToast] = useIonToast();

  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idType, setIdType] = useState<string>("");
  const [agree, setAgree] = useState(false);

  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const openFilePicker = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFileName(file ? file.name : "");
  };

  const handleIdTypeSelect = (type: string) => {
    setIdType(type);
    setShowModal(false);
  };

  const getIdTypeIcon = () => {
    switch(idType) {
      case "Student": return schoolOutline;
      case "PWD": return accessibilityOutline;
      case "Senior Citizen": return peopleOutline;
      default: return null;
    }
  };

  const handleApply = () => {
    if (!fullName || !idNumber || !idType) {
      presentToast({ message: "Please complete all fields.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    if (!selectedFileName) {
      presentToast({ message: "Please upload your ID.", duration: 2500, color: "danger", position: "top" });
      return;
    }
    if (!agree) {
      presentToast({ message: "Please agree to the terms of service policy.", duration: 2500, color: "danger", position: "top" });
      return;
    }

    setIsReviewing(true);
    
    setTimeout(() => {
      setIsReviewing(false);
      setIsApproved(true);
    }, 3000);
  };

  const handleApprovalDone = () => {
    setIsApproved(false);
    ionRouter.push(ROUTES.TABS_PROFILE, "back");
  };

  return (
    <IonPage data-page="discount">
      <PageHeader title="Apply for Discount" defaultHref={ROUTES.TABS_PROFILE} />

      <IonContent fullscreen scrollY={true} className="discount-content">
        {isReviewing ? (
          <div className="discount-review-screen">
            <div className="discount-review-animation">
              <div className="discount-checkmark-circle">
                <svg className="discount-checkmark" viewBox="0 0 52 52">
                  <circle className="discount-checkmark-circle-anim" cx="26" cy="26" r="25" fill="none"/>
                  <path className="discount-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
            </div>
            <h2 className="discount-review-title">Reviewing your ID</h2>
            <p className="discount-review-text">We are verifying your ID, please sit back as it will take up 24 hours for your request to be registered.</p>
          </div>
        ) : isApproved ? (
          <div className="discount-approved-screen">
            <div className="discount-approved-card">
              <div className="discount-approved-header">
                <svg className="discount-approved-checkmark" viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="25" fill="#fff"/>
                  <path fill="none" stroke="#008000" strokeWidth="3" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h3>Discount Approved!</h3>
                <p>Congratulations! Your discount request has been approved.</p>
              </div>
            </div>
            
            <div className="discount-approved-badge">
              {idType === "Student" && (
                <>
                  <IonIcon icon={schoolOutline} className="discount-badge-icon" />
                  <span className="discount-badge-label">STUDENT</span>
                </>
              )}
              {idType === "PWD" && (
                <>
                  <IonIcon icon={accessibilityOutline} className="discount-badge-icon" />
                  <span className="discount-badge-label">PWD</span>
                </>
              )}
              {idType === "Senior Citizen" && (
                <>
                  <IonIcon icon={peopleOutline} className="discount-badge-icon" />
                  <span className="discount-badge-label">SENIOR CITIZEN</span>
                </>
              )}
            </div>

            <IonButton expand="block" className="discount-done-btn" onClick={handleApprovalDone}>
              Done
            </IonButton>
          </div>
        ) : (
          <div className="discount-form">
          <IonItem lines="none" className="discount-input">
            <IonInput
              placeholder="Full Name"
              value={fullName}
              onIonChange={(e) => setFullName(e.detail.value ?? "")}
            />
          </IonItem>

          <IonItem lines="none" className="discount-input">
            <IonInput
              placeholder="ID Number"
              value={idNumber}
              onIonChange={(e) => setIdNumber(e.detail.value ?? "")}
            />
          </IonItem>

          <div
            className="discount-input discount-select"
            onClick={() => setShowModal(true)}
          >
            {idType && getIdTypeIcon() && (
              <IonIcon
                icon={getIdTypeIcon()!}
                className="discount-select-type-icon"
              />
            )}
            <IonText color={idType ? "dark" : "medium"} className="discount-select-text">
              {idType || "Select ID Type"}
            </IonText>
            <IonIcon
              icon={chevronDownOutline}
              className="discount-select-chevron"
            />
          </div>

          <div className="discount-upload" onClick={openFilePicker} role="button" tabIndex={0}>
            <div className="discount-upload-inner">
              <div className="discount-upload-text">
                {selectedFileName ? selectedFileName : "Upload your ID"}
              </div>
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={onFileChange}
            style={{ display: "none" }}
          />

          <div className="discount-terms">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              id="discount-terms"
            />
            <label htmlFor="discount-terms">I agree to terms of service policy</label>
          </div>

          <IonButton expand="block" className="discount-apply-btn" onClick={handleApply}>
            Apply
          </IonButton>
        </div>
        )}

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          className="discount-type-modal"
          backdropDismiss={true}
        >
          <div className="discount-type-modal-content">
            <h2 className="modal-heading">Choose ID Type</h2>
            <p className="modal-subtext">Select one to apply your discount</p>

            <div className="modal-options-list">
              <div className="modal-option-row" onClick={() => handleIdTypeSelect("Student")}>
                <IonIcon icon={schoolOutline} />
                <span>Student</span>
              </div>

              <div className="modal-option-row" onClick={() => handleIdTypeSelect("Senior Citizen")}>
                <IonIcon icon={peopleOutline} />
                <span>Senior Citizen</span>
              </div>

              <div className="modal-option-row" onClick={() => handleIdTypeSelect("PWD")}>
                <IonIcon icon={accessibilityOutline} />
                <span>PWD</span>
              </div>
            </div>

            <IonButton
              expand="block"
              fill="clear"
              className="modal-cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default DiscountPage;
