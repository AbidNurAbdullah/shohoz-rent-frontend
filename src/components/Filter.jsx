import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-normal text-2xl text-gray-900">
        Search results for <b>{searchParams.get("city") || "all locations"}</b>
      </h1>

      <div className="w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-[10px] uppercase font-bold tracking-wide text-white">
            Location
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
            className="w-full p-2.5 border bg-white border-gray-300 rounded-md text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-5 mt-2">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold tracking-wide text-white">Type</label>
          <select
            name="type"
            onChange={handleChange}
            defaultValue={query.type}
            className="w-[100px] p-2.5 border bg-white border-gray-300 rounded-md text-sm outline-none"
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold tracking-wide text-white">Property</label>
          <select
            name="property"
            onChange={handleChange}
            defaultValue={query.property}
            className="w-[100px] p-2.5 border bg-white border-gray-300 rounded-md text-sm outline-none"
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold tracking-wide text-white">Min Price</label>
          <input
            type="number"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
            className="w-[100px] p-2.5 border bg-white border-gray-300 rounded-md text-sm outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold tracking-wide text-white">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
            className="w-[100px] p-2.5 border bg-white border-gray-300 rounded-md text-sm outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold tracking-wide text-white">Bedroom</label>
          <input
            type="number"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
            className="w-[100px] p-2.5 border bg-white border-gray-300 rounded-md text-sm outline-none"
          />
        </div>

         <button onClick={handleFilter}
         className="bg-gray-800 text-white px-6 rounded-md font-semibold hover:bg-gray-900 h-[40px] mt-auto flex items-center justify-center transition">
        🔍 Filter
      </button>
      </div>
    </div>
  );
}

export default Filter;