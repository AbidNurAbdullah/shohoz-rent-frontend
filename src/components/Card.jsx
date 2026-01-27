import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <div className="flex gap-5 bg-white/10 p-3 rounded-xl border border-white/5 shadow-sm mb-4">
    
      <Link
        to={`/${item.id}`}
        className="flex-[2] h-[200px] md:block hidden relative overflow-hidden rounded-lg"
      >
        <img
        
          src={item.images[0] ? `http://localhost:8800${item.images[0]}` : "/apartment2.jpg"}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
        />
      </Link>

      
      <div className="flex-[3] flex flex-col justify-between gap-2 py-1">
      
        <h2 className="text-xl font-bold text-white hover:text-yellow-400 transition-all">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>

      
        <p className="text-sm text-gray-200 flex items-center gap-2">
          <img src="/pin.png" alt="" className="w-4 h-4" />
          <span>{item.address}</span>
        </p>

      
        <p className="text-lg font-bold text-yellow-400 bg-black/20 px-3 py-1 rounded-md w-max">
          {item.price} Tk.
        </p>

      
        <div className="flex justify-between items-center mt-auto">
        
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2 bg-white/20 text-white px-3 py-1.5 rounded-full border border-white/10">
              <img src="/bed.png" className="w-3.5 h-3.5" alt="" />
              <span>{item.bedroom} Bed</span>
            </div>

            <div className="flex items-center gap-2 bg-white/20 text-white px-3 py-1.5 rounded-full border border-white/10">
              <img src="/bath.png" className="w-3.5 h-3.5" alt="" />
              <span>{item.bathroom} Bath</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;