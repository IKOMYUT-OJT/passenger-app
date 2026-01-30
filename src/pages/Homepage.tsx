import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonButton,
} from "@ionic/react";
import { lockClosed, chevronUpOutline, notifications } from "ionicons/icons";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useIonRouter } from "@ionic/react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/Homepage.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapResizer() {
  const map = useMap();

  useEffect(() => {
    const t = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(t);
  }, [map]);

  return null;
}

const Homepage: React.FC = () => {
  const center: [number, number] = [14.5995, 120.9842];
  const ionRouter = useIonRouter();

  const openNearby = () => {
    window.dispatchEvent(new Event("open-nearby"));
  };

  const goToNotifications = () => {
    ionRouter.push("/notifications");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="home-content" scrollY={false}>
        <div className="map-wrap">
          <MapContainer
            center={center}
            zoom={15}
            zoomControl={false}
            className="leaflet-map"
          >
            <MapResizer />
           <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution="&copy; OpenStreetMap contributors"
            />
          </MapContainer>
        </div>

        <IonFab slot="fixed" vertical="top" horizontal="start" className="logo-fab">
          <div className="logo-fab-btn">
            <img src="./logoicon.png" alt="Logo" className="top-logo" />
          </div>
        </IonFab>

        <IonFab slot="fixed" vertical="top" horizontal="end" className="top-fab">
          <IonFabButton className="top-fab-btn" onClick={goToNotifications}>
            <IonIcon icon={notifications} />
          </IonFabButton>
        </IonFab>

        <div className="nearby-wrap">
          <IonButton expand="block" className="nearby-btn" onClick={openNearby}>
            <IonIcon icon={chevronUpOutline} slot="start" />
            Show Nearby Buses
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
