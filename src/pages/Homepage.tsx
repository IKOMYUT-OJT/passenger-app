import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonButton,
} from "@ionic/react";
import { chevronUpOutline, notifications } from "ionicons/icons";
import { useEffect, useState } from "react";
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

function MapResizer({ onZoomStart, onZoomEnd }: { onZoomStart: () => void; onZoomEnd: () => void }) {
  const map = useMap();

  useEffect(() => {
    const t = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    map.on('zoomstart', onZoomStart);
    map.on('zoomend', onZoomEnd);

    return () => {
      clearTimeout(t);
      map.off('zoomstart', onZoomStart);
      map.off('zoomend', onZoomEnd);
    };
  }, [map, onZoomStart, onZoomEnd]);

  return null;
}

const Homepage: React.FC = () => {
  const center: [number, number] = [14.5995, 120.9842];
  const ionRouter = useIonRouter();
  const [isZooming, setIsZooming] = useState(false);

  const openNearby = () => {
    window.dispatchEvent(new Event("open-nearby"));
  };

  const goToNotifications = () => {
    ionRouter.push("/notifications");
  };

  const handleZoomStart = () => {
    setIsZooming(true);
  };

  const handleZoomEnd = () => {
    setTimeout(() => setIsZooming(false), 300);
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
            <MapResizer onZoomStart={handleZoomStart} onZoomEnd={handleZoomEnd} />
           <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution="&copy; OpenStreetMap contributors"
            />
          </MapContainer>
        </div>

        <div className={`status-bar-overlay ${isZooming ? 'transparent' : ''}`} />

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
