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
} from "@ionic/react";
import "../styles/DiscountPage.css";

const DiscountPage: React.FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idType, setIdType] = useState<string>("Student");
  const [agree, setAgree] = useState(false);

  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const openFilePicker = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFileName(file ? file.name : "");
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

      <IonContent fullscreen scrollY={false} className="discount-content">
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

          <IonItem lines="none" className="discount-input discount-select">
            <IonSelect
              value={idType}
              interface="popover"
              placeholder="ID Type"
              onIonChange={(e) => setIdType(e.detail.value)}
            >
              <IonSelectOption value="Student">Student</IonSelectOption>
              <IonSelectOption value="PWD">PWD</IonSelectOption>
              <IonSelectOption value="Senior Citizen">Senior Citizen</IonSelectOption>
            </IonSelect>

            <div className="discount-select-hint">
              <IonText color="medium">Ex. {idType || "Student"}</IonText>
            </div>
          </IonItem>

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
      </IonContent>
    </IonPage>
  );
};

export default DiscountPage;
