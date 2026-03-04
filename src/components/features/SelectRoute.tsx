import React, { useState } from "react";
import { IoChevronUp, IoChevronDown, IoSearch } from "react-icons/io5";
import "../../styles/home/SelectRoute.scss";

export interface Route {
  id: string;
  from: string;
  to: string;
}

interface SelectRouteProps {
  routes: Route[];
  expanded?: boolean;
  onHeaderClick?: () => void;
  onSelectRoute?: (route: Route) => void;
}

const SelectRoute: React.FC<SelectRouteProps> = ({
  routes,
  expanded = true,
  onHeaderClick,
  onSelectRoute,
}) => {
  const [search, setSearch] = useState("");

  const filtered = routes.filter(
    (r) =>
      r.from.toLowerCase().includes(search.toLowerCase()) ||
      r.to.toLowerCase().includes(search.toLowerCase())
  );

  const maxListHeight = filtered.length > 4 ? 320 : filtered.length * 72;
  const totalMaxHeight = expanded ? 56 + 52 + maxListHeight + 24 : 56;

  return (
    <div
      className={`select-route-card${expanded ? " expanded" : " collapsed"}`}
      style={{
        maxHeight: totalMaxHeight,
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div
        className="select-route-header"
        onClick={onHeaderClick}
        style={{ cursor: "pointer" }}
      >
        <span className="select-route-title">Select Route</span>
        <span className="select-route-chevron">
          {expanded ? (
            <IoChevronDown size={20} color="#666" />
          ) : (
            <IoChevronUp size={20} color="#666" />
          )}
        </span>
      </div>

      {expanded && (
        <>
          <div className="select-route-search">
            <IoSearch size={16} color="#aaa" className="search-icon" />
            <input
              className="select-route-input"
              placeholder="Search for route"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div
            className={`select-route-list${
              filtered.length > 4 ? " scrollable" : ""
            }`}
          >
            {filtered.map((route) => (
              <div
                className="select-route-item"
                key={route.id}
                onClick={() => onSelectRoute?.(route)}
              >
                <div className="route-item-row">
                  <span className="route-from">{route.from}</span>
                  <span className="route-arrow">→</span>
                  <span className="route-to">{route.to}</span>
                </div>
                <span className="route-bus-emoji">🚌</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="select-route-empty">No routes found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectRoute;
