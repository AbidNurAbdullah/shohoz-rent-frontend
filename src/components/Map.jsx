import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function Map({ items }) {
  const center = items.length > 0 
    ? [parseFloat(items[0].latitude), parseFloat(items[0].longitude)] 
    : [23.8103, 90.4125];

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      className="w-full h-full rounded-xl shadow-lg border-2 border-white/30"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => {
        const lat = parseFloat(String(item.latitude).replace(/[^0-9.-]/g, ""));
        const lng = parseFloat(String(item.longitude).replace(/[^0-9.-]/g, ""));

        if (!isNaN(lat) && !isNaN(lng)) {
          return (
            <Marker key={item.id} position={[lat, lng]}>
              <Popup>
                <div className="flex gap-2 min-w-[150px]">
                  <img 
                    src={
                      item.images[0] 
                        ? (item.images[0].startsWith("http") 
                          ? item.images[0] 
                          : `https://shohoz-rent-backend.onrender.com${item.images[0]}`) 
                        : "/apartment2.jpg"
                    } 
                    alt="" 
                    className="w-12 h-10 object-cover rounded" 
                  />
                  <div className="flex flex-col">
                    <Link to={`/${item.id}`} className="font-bold text-xs hover:underline">{item.title}</Link>
                    <b className="text-xs">{item.price} Tk</b>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}

export default Map;