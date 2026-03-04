import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { notifications, chevronUp, list, layers, locate } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ROUTES } from "../../constants";
import NearbyBuses from "../../components/features/NearbyBuses";
import SelectRoute from "../../components/features/SelectRoute";
import { mockNearbyBuses } from "./mockNearbyBuses";
import { mockRoutes } from "./mockRoutes";
import "../../styles/home/HomePage.scss";

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

const userLocationIcon = L.divIcon({
  className: '',
  html: `<div class="user-location-pin">
    <div class="user-location-pin-head">
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z"/>
      </svg>
    </div>
    <div class="user-location-pin-tail"></div>
  </div>`,
  iconSize: [40, 52],
  iconAnchor: [20, 52],
});

function MapLocator({ trigger, onLocation }: { trigger: number; onLocation: (pos: [number, number]) => void }) {
  const map = useMap();
  const prevTrigger = useRef(0);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        onLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {},
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [onLocation]);

  useEffect(() => {
    if (trigger === 0 || trigger === prevTrigger.current) return;
    prevTrigger.current = trigger;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.flyTo([pos.coords.latitude, pos.coords.longitude], 17, { duration: 1.2 });
      },
      () => {}
    );
  }, [trigger, map]);

  return null;
}

const HomePage: React.FC = () => {
  const center: [number, number] = [14.5995, 120.9842];
  const ionRouter = useIonRouter();
  const [isZooming, setIsZooming] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [isSatellite, setIsSatellite] = useState(false);
  const [locateTrigger, setLocateTrigger] = useState(0);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const goToNotifications = () => {
    ionRouter.push(ROUTES.NOTIFICATIONS);
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
              key={isSatellite ? 'satellite' : 'street'}
              url={
                isSatellite
                  ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
              attribution={
                isSatellite
                  ? "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics"
                  : "&copy; OpenStreetMap contributors"
              }
            />
            <MapLocator trigger={locateTrigger} onLocation={setUserLocation} />
            {userLocation && (
              <Marker position={userLocation} icon={userLocationIcon} />
            )}
          </MapContainer>
        </div>

        <div className={`status-bar-overlay ${isZooming ? 'transparent' : ''}`} />

        <IonFab slot="fixed" vertical="top" horizontal="start" className="top-fab">
          <IonFabButton className="top-fab-btn" onClick={() => { setShowRoutes(true); setShowNearby(false); }}>
            <IonIcon icon={list} />
          </IonFabButton>
        </IonFab>

        <IonFab slot="fixed" vertical="top" horizontal="end" className="top-fab">
          <IonFabButton className="top-fab-btn" onClick={goToNotifications}>
            <IonIcon icon={notifications} />
          </IonFabButton>
        </IonFab>

        <div className="map-controls-right">
          <button
            className={`map-ctrl-btn${isSatellite ? ' active' : ''}`}
            onClick={() => setIsSatellite(v => !v)}
            aria-label="Toggle satellite view"
          >
            <IonIcon icon={layers} />
          </button>
          <button
            className="map-ctrl-btn"
            onClick={() => setLocateTrigger(v => v + 1)}
            aria-label="Go to my location"
          >
            <IonIcon icon={locate} />
          </button>
        </div>

        <div className="nearby-wrap">
          {!showNearby && !showRoutes && (
            <button
              className="nearby-toggle-green-btn"
              onClick={() => setShowNearby(true)}
              aria-label="Show Nearby Buses"
            >
              <IonIcon icon={chevronUp} className="nearby-toggle-icon" />
              <span className="nearby-toggle-label">Show Nearby Buses</span>
            </button>
          )}
          {showNearby && (
            <NearbyBuses
              buses={mockNearbyBuses}
              expanded={true}
              onHeaderClick={() => setShowNearby(false)}
            />
          )}
          {showRoutes && (
            <SelectRoute
              routes={mockRoutes}
              expanded={true}
              onHeaderClick={() => setShowRoutes(false)}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
