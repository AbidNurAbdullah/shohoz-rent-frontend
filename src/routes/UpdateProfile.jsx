import React, { useState } from "react";
import Navbar from "../components/navbar";
import apiRequest from "../lib/apiRequest"; // apiRequest ইমপোর্ট করা হয়েছে
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let avatarUrl = currentUser.avatar;

      if (file) {
        const data = new FormData();
        data.append("files", file);

        const uploadRes = await apiRequest.post("/upload", data);
        avatarUrl = uploadRes.data[0]; 
      }

      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        ...formData,
        avatar: avatarUrl,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/profile");
      window.location.reload(); 
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Update failed!");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/homepage.jpg')" }}>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center gap-10 mt-24 p-4">
        <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/20 border border-white/30">
          <div className="bg-[#0d1b2a] py-4 text-center text-white">
            <h2 className="text-2xl font-bold">Update Profile</h2>
          </div>
          <div className="px-6 py-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-white font-semibold">Username</label>
                <input name="username" value={formData.username} onChange={handleChange} className="w-full mt-1 p-2.5 rounded-xl bg-white/80 outline-none" />
              </div>
              <div>
                <label className="text-white font-semibold">Email</label>
                <input name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2.5 rounded-xl bg-white/80 outline-none" />
              </div>
              <div>
                <label className="text-white font-semibold">Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 p-2.5 rounded-xl bg-white/80 outline-none" />
              </div>
              <div>
                <label className="text-white font-semibold">Password</label>
                <input type="password" name="password" placeholder="New password (optional)" onChange={handleChange} className="w-full mt-1 p-2.5 rounded-xl bg-white/80 outline-none" />
              </div>
              <button className="w-full py-3 bg-[#0d1b2a] text-white rounded-xl font-bold hover:bg-black transition">Save Changes</button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-3xl shadow-2xl">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={file ? URL.createObjectURL(file) : (currentUser?.avatar ? (currentUser.avatar.startsWith("http") ? currentUser.avatar : `https://shohoz-rent-backend.onrender.com${currentUser.avatar}`) : "/default.png")} 
              className="object-cover w-full h-full"
              alt="Preview"
            />
          </div>
          <label className="mt-4 cursor-pointer bg-yellow-500 px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition">
            Change Photo
            <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;