import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useMyLocation } from "../hooks/useMyLocation";
import useQueryString from "../hooks/useQueryString";

function Map() {
  const { cities } = useSelector((store) => store.city);
  const [position, setPosition] = useState([24.4352079, 90.9229993]);
  const [lat, lng] = useQueryString();
  const { isLoading, position: geoPosition, getPosition } = useMyLocation();

  useEffect(() => {
    if ((lat, lng)) setPosition([+lat, +lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition) setPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button onClick={getPosition} type="position" disabled={isLoading}>
          {isLoading ? "Loading......." : "use your position"}
        </Button>
      )}

      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <SetMapPosition position={position} />
        <TriggerMapPosition />
      </MapContainer>
    </div>
  );
}

function SetMapPosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function TriggerMapPosition() {
  const navigate = useNavigate();

  useMapEvents({
    click: (eve) =>
      navigate(`form?lat=${eve.latlng.lat}&lng=${eve.latlng.lng}`),
  });
}

export default Map;
