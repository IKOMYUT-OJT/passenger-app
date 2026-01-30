import { useRef, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonText,
  IonModal,
  IonIcon,
} from "@ionic/react";
import { closeOutline, schoolOutline, accessibilityOutline, peopleOutline, chevronDownOutline } from "ionicons/icons";
import "../styles/DiscountPage.css";

const DiscountPage: React.FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idType, setIdType] = useState<string>("");
  const [agree, setAgree] = useState(false);

  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

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
      alert("Please complete all fields.");
      return;
    }
    if (!selectedFileName) {
      alert("Please upload your ID.");
      return;
    }
    if (!agree) {
      alert("Please agree to the terms of service policy.");
      return;
    }

    alert("Discount request submitted!");
  };

  return (
    <IonPage>
      <IonHeader className="discount-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/tabs/profilepage" />
          </IonButtons>
          <IonTitle className="discount-title">Apply for Discount</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={true} className="discount-content">
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
            style={{ 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
              gap: "8px"
            }}
          >
            {idType && getIdTypeIcon() && (
              <IonIcon 
                icon={getIdTypeIcon()!} 
                style={{ fontSize: "20px", color: "#008000" }}
              />
            )}
            <IonText color={idType ? "dark" : "medium"} style={{ fontFamily: "Poppins, sans-serif" }}>
              {idType || "Select ID Type"}
            </IonText>
            <IonIcon 
              icon={chevronDownOutline} 
              style={{ fontSize: "18px", color: "#666", marginLeft: "auto" }}
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

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          className="discount-type-modal"
          cssClass="centered-modal"
          backdropDismiss={true}
          style={{
            "--background": "rgba(0, 0, 0, 0.5)",
            "--backdrop-opacity": "0.5"
          }}
        >
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            maxWidth: "340px",
            width: "90%",
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)"
          }}>
            <h2 style={{ 
              fontFamily: "Poppins, sans-serif", 
              fontSize: "18px", 
              fontWeight: "600", 
              margin: "0 0 4px 0",
              textAlign: "left",
              color: "#000"
            }}>
              Choose ID Type
            </h2>
            <p style={{ 
              fontFamily: "Poppins, sans-serif", 
              fontSize: "13px", 
              color: "#666",
              margin: "0 0 24px 0",
              textAlign: "left"
            }}>
              Select one to apply your discount
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              <div 
                onClick={() => handleIdTypeSelect("Student")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 0",
                  cursor: "pointer",
                  transition: "opacity 0.2s"
                }}
                onMouseDown={(e) => e.currentTarget.style.opacity = "0.6"}
                onMouseUp={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <IonIcon 
                  icon={schoolOutline} 
                  style={{ fontSize: "22px", color: "#000", marginRight: "12px" }}
                />
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px", color: "#000" }}>
                  Student
                </span>
              </div>

              <div 
                onClick={() => handleIdTypeSelect("Senior Citizen")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 0",
                  cursor: "pointer",
                  transition: "opacity 0.2s"
                }}
                onMouseDown={(e) => e.currentTarget.style.opacity = "0.6"}
                onMouseUp={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <IonIcon 
                  icon={peopleOutline} 
                  style={{ fontSize: "22px", color: "#000", marginRight: "12px" }}
                />
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px", color: "#000" }}>
                  Senior Citizen
                </span>
              </div>

              <div 
                onClick={() => handleIdTypeSelect("PWD")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 0",
                  cursor: "pointer",
                  transition: "opacity 0.2s"
                }}
                onMouseDown={(e) => e.currentTarget.style.opacity = "0.6"}
                onMouseUp={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <IonIcon 
                  icon={accessibilityOutline} 
                  style={{ fontSize: "22px", color: "#000", marginRight: "12px" }}
                />
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px", color: "#000" }}>
                  PWD
                </span>
              </div>
            </div>

            <IonButton
              expand="block"
              fill="clear"
              onClick={() => setShowModal(false)}
              style={{ 
                marginTop: "20px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                fontSize: "15px",
                "--color": "#666",
                border: "1px solid #d0d0d0",
                borderRadius: "12px",
                height: "44px"
              }}
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
