import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="flex gap-4">
        
          <img
            src={item.images[0]}
            alt=""
            className="w-16 h-12 object-cover rounded-md"
          />

        
          <div className="flex flex-col justify-between">
            <Link
              to={`/${item.id}`}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              {item.title}
            </Link>

            <span className="text-xs text-gray-500">
              {item.bedroom} bedroom
            </span>

            <b className="text-sm">$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
