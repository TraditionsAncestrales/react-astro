import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

// MAIN ************************************************************************************************************************************
export function TheContactMap({ className }: TheContactMapProps) {
  const center: [number, number] = [-21.142_107, 55.294_209];

  const icon = new Icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "/map/icon.png",
    iconRetinaUrl: "/map/icon2.png",
    shadowUrl: "/map/shadow.png",
  });

  return (
    <MapContainer center={center} zoom={17} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={icon}></Marker>
    </MapContainer>
  );
}

// TYPES *********************************************************************************************************************************
export type TheContactMapProps = {
  className: string;
};
