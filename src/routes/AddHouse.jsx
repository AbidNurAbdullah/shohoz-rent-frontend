import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

const AddHouse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [pickedFiles, setPickedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    address: "",
    price: "",
    bedroom: "",
    bathroom: "",
    property: "apartment",
    type: "rent",
    totalSize: "",
    busDistance: "",
    schoolDistance: "",
    restaurantDistance: "",
    incomePolicy: "",
    petPolicy: "Allowed",
    utilities: "Renter is responsible",
    latitude: "",
    longitude: "",
  });


  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const res = await axios.get(`http://localhost:8800/api/posts/${id}`);
          const post = res.data;
          
        
          setForm({
            title: post.title,
            description: post.postDetail?.desc || "",
            city: post.city,
            address: post.address,
            price: post.price,
            bedroom: post.bedroom,
            bathroom: post.bathroom,
            property: post.property,
            type: post.type,
            totalSize: post.postDetail?.size || "",
            busDistance: post.postDetail?.bus || "",
            schoolDistance: post.postDetail?.school || "",
            restaurantDistance: post.postDetail?.restaurant || "",
            incomePolicy: post.postDetail?.income || "",
            petPolicy: post.postDetail?.pet || "Allowed",
            utilities: post.postDetail?.utilities || "Renter is responsible",
            latitude: post.latitude,
            longitude: post.longitude,
          });
          setExistingImages(post.images || []);
        } catch (err) {
          console.log(err);
          setError("Failed to fetch property data.");
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const selectedFiles = Array.from(files);
      setPickedFiles((prev) => [...prev, ...selectedFiles]);
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      setPickedFiles(pickedFiles.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let finalImages = [...existingImages]; 

    
      if (pickedFiles.length > 0) {
        const formData = new FormData();
        pickedFiles.forEach((file) => {
          formData.append("files", file);
        });

        const uploadRes = await axios.post(
          "http://localhost:8800/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        finalImages = [...finalImages, ...uploadRes.data];
      }

      const dataToSend = {
        postData: {
          title: form.title,
          price: parseInt(form.price),
          address: form.address,
          city: form.city,
          bedroom: parseInt(form.bedroom),
          bathroom: parseInt(form.bathroom),
          type: "rent",
          property: form.property.toLowerCase(),
          latitude: form.latitude,
          longitude: form.longitude,
          images: finalImages,
        },
        postDetail: {
          desc: form.description,
          utilities: form.utilities,
          pet: form.petPolicy,
          income: form.incomePolicy,
          size: parseInt(form.totalSize) || 0,
          school: parseInt(form.schoolDistance) || 0,
          bus: parseInt(form.busDistance) || 0,
          restaurant: parseInt(form.restaurantDistance) || 0,
        },
      };

      if (id) {
      
        await axios.put(
          `http://localhost:8800/api/posts/${id}`,
          dataToSend,
          { withCredentials: true }
        );
        navigate("/" + id);
      } else {
      
        const res = await axios.post(
          "http://localhost:8800/api/posts",
          dataToSend,
          { withCredentials: true }
        );
        navigate("/" + res.data.id);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Operation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/homepage.jpg')" }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto pt-30 px-10 py-20">
        <div className="bg-black/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6 border border-white/10">
          
          <form onSubmit={handleSubmit} className="lg:col-span-2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/20 pb-4">
              {id ? "Edit Property" : "Add New Property"}
            </h2>
            
            {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-lg mb-6 text-sm">{error}</div>}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Property Title</label>
                <input
                  name="title"
                  required
                  value={form.title}
                  onChange={handleInput}
                  className="w-full p-3 rounded-lg bg-white/90 text-black outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Add title..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  value={form.description}
                  onChange={handleInput}
                  className="w-full h-32 p-3 rounded-lg bg-white/90 text-black outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Tell something about the house..."
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Full Address</label>
                    <input name="address" required value={form.address} onChange={handleInput} className="w-full p-2.5 rounded-lg bg-white/90" placeholder="Street, House no..." />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Price (Monthly Tk)</label>
                    <input name="price" type="number" required value={form.price} onChange={handleInput} className="w-full p-2.5 rounded-lg bg-white/90" placeholder="e.g. 15000" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-white text-xs">City</label>
                <input name="city" required value={form.city} onChange={handleInput} className="w-full p-2 rounded bg-white/90" placeholder="Dhaka" />
              </div>
              <div>
                <label className="text-white text-xs">Bedrooms</label>
                <select name="bedroom" required value={form.bedroom} onChange={handleInput} className="w-full p-2 rounded bg-white/90">
                    <option value="">Select</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="text-white text-xs">Bathrooms</label>
                <select name="bathroom" required value={form.bathroom} onChange={handleInput} className="w-full p-2 rounded bg-white/90">
                    <option value="">Select</option>
                    {[1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="text-white text-xs">Property Type</label>
                <select name="property" value={form.property} onChange={handleInput} className="w-full p-2 rounded bg-white/90">
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <input name="totalSize" type="number" value={form.totalSize} onChange={handleInput} className="p-2 rounded bg-white/90" placeholder="Size (sqft)" />
              <input name="latitude" required value={form.latitude} onChange={handleInput} className="p-2 rounded bg-white/90" placeholder="Latitude (23.x)" />
              <input name="longitude" required value={form.longitude} onChange={handleInput} className="p-2 rounded bg-white/90" placeholder="Longitude (90.x)" />
              <select name="petPolicy" value={form.petPolicy} onChange={handleInput} className="p-2 rounded bg-white/90">
                <option value="Allowed">Pets Allowed</option>
                <option value="Not Allowed">Not Allowed</option>
              </select>
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Utilities</label>
                <select 
                    name="utilities" 
                    value={form.utilities} 
                    onChange={handleInput} 
                    className="w-full p-3 rounded-lg bg-white/90 text-black outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="Renter is responsible">Renter is responsible</option>
                    <option value="Owner is responsible">Owner is responsible</option>
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 border-t border-white/10 pt-6">
               <div>
                 <label className="text-white text-[10px] block mb-1">Bus (meters)</label>
                 <input name="busDistance" type="number" value={form.busDistance} onChange={handleInput} className="w-full p-2 rounded bg-white/90" placeholder="100" />
               </div>
               <div>
                 <label className="text-white text-[10px] block mb-1">School (meters)</label>
                 <input name="schoolDistance" type="number" value={form.schoolDistance} onChange={handleInput} className="w-full p-2 rounded bg-white/90" placeholder="500" />
               </div>
               <div>
                 <label className="text-white text-[10px] block mb-1">Restaurant (meters)</label>
                 <input name="restaurantDistance" type="number" value={form.restaurantDistance} onChange={handleInput} className="w-full p-2 rounded bg-white/90" placeholder="200" />
               </div>
            </div>

            <button
              disabled={isLoading}
              className={`mt-10 w-full md:w-max px-12 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${isLoading ? "bg-gray-600 animate-pulse" : "bg-gray-800 hover:bg-gray-900 active:scale-95"}`}
            >
              {isLoading ? (id ? "Updating..." : "Publishing...") : (id ? "Update Property" : "Add Property Now")}
            </button>
          </form>

          <div className="p-8 bg-white/5 flex flex-col border-l border-white/10">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>🖼️</span> Property Photos ({pickedFiles.length + existingImages.length})
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            
              {existingImages.map((img, index) => (
                <div key={`old-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-white/20 group">
                  <img src={`http://localhost:8800${img}`} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(index, true)} className="absolute top-1 right-1 bg-red-500/80 text-white w-6 h-6 rounded-full text-xs">✕</button>
                </div>
              ))}

            
              {pickedFiles.map((file, index) => (
                <div key={`new-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-white/20 group">
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500/80 text-white w-6 h-6 rounded-full text-xs">✕</button>
                </div>
              ))}
              
              <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:bg-white/10 transition group">
                <span className="text-3xl text-white group-hover:scale-125 transition">+</span>
                <span className="text-[10px] text-white/60 mt-1">Add Photo</span>
                <input type="file" name="images" multiple onChange={handleInput} className="hidden" accept="image/*" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHouse;