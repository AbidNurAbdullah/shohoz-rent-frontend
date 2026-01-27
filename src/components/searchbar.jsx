import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
  
    navigate(`/list?city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`);
  };

  return (
    <div className="bg-white rounded-md shadow-md flex flex-col md:flex-row justify-between items-center overflow-hidden w-full max-w-3xl mx-auto">
      <input
        type="text"
        name="city"
        placeholder="City Location"
        onChange={handleChange}
        className="w-full md:w-1/3 px-6 py-4 text-gray-600 outline-none border-b md:border-b-0 md:border-r border-gray-200"
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        onChange={handleChange}
        className="w-full md:w-1/3 px-6 py-4 text-gray-600 outline-none border-b md:border-b-0 md:border-r border-gray-200"
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        onChange={handleChange}
        className="w-full md:w-1/3 px-6 py-4 text-gray-600 outline-none border-b md:border-b-0 md:border-r border-gray-200"
      />
      
      <button 
        onClick={handleSearch}
        className="bg-gray-800 text-white px-8 py-4 font-semibold hover:bg-gray-900 w-full md:w-auto text-center transition"
      >
        🔍 Search
      </button>
    </div>
  );
};

export default SearchBar;