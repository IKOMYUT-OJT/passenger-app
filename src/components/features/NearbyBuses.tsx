import React from "react";
import "../../styles/home/NearbyBuses.css";
import { IoBus, IoChevronUp, IoChevronDown, IoTrash, IoGrid } from "react-icons/io5";

export interface NearbyBus {
  id: string;
  busNumber: string;
  routeDescription: string;
  distance: string;
  eta: string;
}

interface NearbyBusesProps {
  buses: NearbyBus[];
  expanded?: boolean;
  onHeaderClick?: () => void;
}

const NearbyBuses: React.FC<NearbyBusesProps> = ({ buses, expanded = true, onHeaderClick }) => {
  // Calculate dynamic height: header (~56px) + up to 3 buses (~300px) + padding
  const maxListHeight = buses.length > 3 ? 300 : buses.length * 100;
  const totalMaxHeight = expanded ? 56 + maxListHeight + 20 : 56;

  return (
    <div className={`nearby-buses-card${expanded ? ' expanded' : ' collapsed'}`}
      style={{
        maxHeight: totalMaxHeight,
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div className="nearby-buses-header" onClick={onHeaderClick} style={{ cursor: 'pointer' }}>
        <div className="nearby-buses-title">
          <span>Nearby Buses</span>
          <span className="nearby-buses-count">{buses.length}</span>
        </div>
        <div className="nearby-buses-actions">
          <div className="nearby-action-icon">
            <IoTrash size={18} color="#666" />
          </div>
          <div className="nearby-action-icon">
            <IoGrid size={18} color="#666" />
          </div>
          <span className="nearby-buses-chevron">
            {expanded ? <IoChevronUp size={20} color="#666" /> : <IoChevronDown size={20} color="#666" />}
          </span>
        </div>
      </div>
      {expanded && (
        <div className={`nearby-buses-list ${buses.length > 3 ? 'scrollable' : ''}`}>
          {buses.map((bus) => (
            <div className="nearby-bus-item" key={bus.id}>
              <div className="nearby-bus-icon">
                <IoBus size={24} color="#1ca12d" />
              </div>
              <div className="nearby-bus-content">
                <div className="nearby-bus-header-row">
                  <div className="nearby-bus-number">{bus.busNumber}</div>
                  <div className="nearby-bus-eta">
                    <span className="eta-number">{bus.eta.split(' ')[0]}</span>
                    <span className="eta-unit">min</span>
                  </div>
                </div>
                <div className="nearby-bus-route">{bus.routeDescription}</div>
                <div className="nearby-bus-details">
                  <div className="nearby-bus-distance">{bus.distance}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyBuses;
