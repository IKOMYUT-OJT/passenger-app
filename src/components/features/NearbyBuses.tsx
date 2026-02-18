import React from "react";
import "../../styles/home/NearbyBuses.css";
import { IoBus, IoChevronUp, IoChevronDown } from "react-icons/io5";

export interface NearbyBus {
  id: string;
  name: string;
  route: string;
  eta: string;
}

interface NearbyBusesProps {
  buses: NearbyBus[];
  expanded?: boolean;
  onHeaderClick?: () => void;
}

const NearbyBuses: React.FC<NearbyBusesProps> = ({ buses, expanded = true, onHeaderClick }) => {
  return (
    <div className={`nearby-buses-card${expanded ? ' expanded' : ' collapsed'}`}
      style={{
        maxHeight: expanded ? 400 : 56,
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div className="nearby-buses-header" onClick={onHeaderClick} style={{ cursor: 'pointer' }}>
        <span>Nearby Buses</span>
        <span className="nearby-buses-chevron">
          {expanded ? <IoChevronUp size={24} color="#1ca12d" /> : <IoChevronDown size={24} color="#1ca12d" />}
        </span>
      </div>
      {expanded && (
        <div className="nearby-buses-list">
          {buses.map((bus) => (
            <div className="nearby-bus-row" key={bus.id}>
              <div className="nearby-bus-icon">
                <IoBus size={28} color="#1ca12d" />
              </div>
              <div className="nearby-bus-info">
                <div className="nearby-bus-name">{bus.name}</div>
                <div className="nearby-bus-route">{bus.route}</div>
              </div>
              <div className="nearby-bus-eta">{bus.eta}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyBuses;
