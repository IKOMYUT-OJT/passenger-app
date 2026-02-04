import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import {
  locationOutline,
  chevronForwardOutline,
  addCircle,
  closeOutline,
} from "ionicons/icons";
import { PageHeader } from "../components/common";
import "../styles/Addresspage.css";

interface SavedPlace {
  id: string;
  title: string;
  address: string;
  notes: string;
}

const Addresspage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [showMapModal, setShowMapModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlace, setEditingPlace] = useState<SavedPlace | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const [currentAddress] = useState("Blk. 2 Lot 113 Phase 123 Brnggy. Evaristo, IAHAHA");
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([
    {
      id: "1",
      title: "Home",
      address: "123 Main St, Manila",
      notes: "Notes: My home"
    },
    {
      id: "2",
      title: "Home",
      address: "123 Main St, Manila",
      notes: "Notes: My home"
    },
    {
      id: "3",
      title: "Home",
      address: "123 Main St, Manila",
      notes: "Notes: My home"
    }
  ]);

  const [placeTitle, setPlaceTitle] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [placeNotes, setPlaceNotes] = useState("");

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingPlace(null);
    setPlaceTitle("");
    setPlaceAddress("");
    setPlaceNotes("");
    setShowMapModal(true);
  };

  const handleEditPlace = (place: SavedPlace) => {
    setIsAddingNew(false);
    setEditingPlace(place);
    setPlaceTitle(place.title);
    setPlaceAddress(place.address);
    setPlaceNotes(place.notes);
    setShowMapModal(true);
  };

  const handleMapSave = () => {
    setShowMapModal(false);
    setShowEditModal(true);
  };

  const handleUpdatePlace = () => {
    if (isAddingNew) {
      const newPlace: SavedPlace = {
        id: Date.now().toString(),
        title: placeTitle || "Home",
        address: placeAddress || "123 Main St, Quezon City",
        notes: placeNotes || ""
      };
      setSavedPlaces([...savedPlaces, newPlace]);
    } else if (editingPlace) {
      setSavedPlaces(savedPlaces.map(p => 
        p.id === editingPlace.id 
          ? { ...p, title: placeTitle, address: placeAddress, notes: placeNotes }
          : p
      ));
    }
    setShowEditModal(false);
    setPlaceTitle("");
    setPlaceAddress("");
    setPlaceNotes("");
  };

  return (
    <IonPage>
      <PageHeader title="My Address" defaultHref="/tabs/profilepage" />

      <IonContent className="page-content address-page-content">
        <div className="address-container">
          <div className="current-address-section">
            <div className="section-header">
              <IonIcon icon={locationOutline} className="section-icon" />
              <h3 className="section-label">Current Location</h3>
            </div>
            <div className="current-address-card" onClick={() => setShowMapModal(true)}>
              <div className="current-address-content">
                <div className="current-address-text">
                  {currentAddress}
                </div>
              </div>
              <IonIcon icon={chevronForwardOutline} className="card-chevron" />
            </div>
          </div>

          <div className="saved-places-section">
            <div className="section-header">
              <IonIcon icon={locationOutline} className="section-icon" />
              <h3 className="section-label">Saved Places</h3>
              <button className="add-place-btn" onClick={handleAddNew}>
                <IonIcon icon={addCircle} />
              </button>
            </div>

            <div className="saved-places-list">
              {savedPlaces.length === 0 ? (
                <div className="empty-state">
                  <IonIcon icon={locationOutline} className="empty-icon" />
                  <p className="empty-text">No saved places yet</p>
                  <p className="empty-subtext">Add your favorite locations for quick access</p>
                </div>
              ) : (
                savedPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="saved-place-card"
                    onClick={() => handleEditPlace(place)}
                  >
                    <div className="saved-place-icon">
                      <IonIcon icon={locationOutline} />
                    </div>
                    <div className="saved-place-content">
                      <div className="saved-place-title">{place.title}</div>
                      <div className="saved-place-address">{place.address}</div>
                      {place.notes && place.notes !== "Notes: My home" && (
                        <div className="saved-place-notes">{place.notes}</div>
                      )}
                    </div>
                    <IonIcon icon={chevronForwardOutline} className="card-chevron" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <IonModal
          isOpen={showMapModal}
          onDidDismiss={() => setShowMapModal(false)}
          className="map-modal"
        >
          <IonHeader>
            <IonToolbar className="map-toolbar">
              <IonButtons slot="start">
                <IonButton onClick={() => setShowMapModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
              <IonTitle className="map-title">Drag the map</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="map-content">
            <div className="map-placeholder">
              <div className="map-marker">
                <IonIcon icon={locationOutline} />
              </div>
            </div>
            <div className="map-address-display">
              <IonIcon icon={locationOutline} className="map-address-icon" />
              <span className="map-address-text">Rodriguez, Subdivision, Rizal, Philippines</span>
            </div>
            <IonButton
              expand="block"
              className="map-save-btn"
              onClick={handleMapSave}
            >
              Save
            </IonButton>
          </IonContent>
        </IonModal>

        <IonModal
          isOpen={showEditModal}
          onDidDismiss={() => setShowEditModal(false)}
          className="edit-modal"
        >
          <IonHeader>
            <IonToolbar className="edit-toolbar">
              <IonButtons slot="start">
                <IonButton onClick={() => setShowEditModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
              <IonTitle className="edit-title">Edit Place</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="edit-content">
            <div className="edit-form">
              <IonItem className="edit-input-item" lines="none">
                <IonInput
                  value={placeTitle}
                  onIonChange={(e) => setPlaceTitle(e.detail.value!)}
                  placeholder="Title"
                  className="edit-input"
                />
              </IonItem>

              <IonItem className="edit-input-item" lines="none">
                <IonInput
                  value={placeAddress}
                  onIonChange={(e) => setPlaceAddress(e.detail.value!)}
                  placeholder="123 Main St, Quezon QC"
                  className="edit-input"
                />
              </IonItem>

              <IonItem className="edit-input-item" lines="none">
                <IonInput
                  value={placeNotes}
                  onIonChange={(e) => setPlaceNotes(e.detail.value!)}
                  placeholder="Notes"
                  className="edit-input"
                />
              </IonItem>

              <IonButton
                expand="block"
                className="update-place-btn"
                onClick={handleUpdatePlace}
              >
                Update Place
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Addresspage;