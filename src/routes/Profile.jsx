import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest"; // apiRequest ইমপোর্ট করা হয়েছে

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]); 
  const [savedPosts, setSavedPosts] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiRequest.get("/users/profilePosts");
        setUserPosts(res.data.userPosts || []);
        setSavedPosts(res.data.savedPosts || []);
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };
    
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      localStorage.removeItem("user");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        await apiRequest.delete(`/users/${currentUser.id}`);
        localStorage.removeItem("user");
        alert("Account deleted.");
        navigate("/");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeletePost = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await apiRequest.delete(`/posts/${id}`);
        setUserPosts((prev) => prev.filter((post) => post.id !== id));
      } catch (err) {
        console.log("Delete Post Error:", err);
        alert("Failed to delete the post.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/homepage.jpg')", backgroundAttachment: "fixed" }}>
      <Navbar />
      <div className="pt-28 pb-10 px-4 flex flex-col xl:flex-row gap-10 w-full max-w-7xl mx-auto">
        
        <div className="w-full xl:w-2/3 rounded-xl p-6 shadow-xl bg-black/10 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">User Information</h2>
            <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">Logout</button>
          </div>

          <div className="flex items-center gap-6 mb-8 bg-white/20 p-4 rounded-lg">
            <img 
              src={currentUser?.avatar 
                ? (currentUser.avatar.startsWith("http") ? currentUser.avatar : `https://shohoz-rent-backend.onrender.com${currentUser.avatar}`) 
                : "/default.png"} 
              alt="avatar" 
              className="w-20 h-20 rounded-full border-2 border-white object-cover" 
            />
            <div className="text-gray-800">
              <p className="text-md"><span className="font-semibold text-gray-800">Username:</span> {currentUser?.username}</p>
              <p className="text-md"><span className="font-semibold text-gray-800">Email:</span> {currentUser?.email}</p>
              <p className="text-md"><span className="font-semibold text-gray-800">Phone:</span> {currentUser?.phone || "Not added"}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-10">
            <Link to="/update-profile">
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition">Update Profile</button>
            </Link>
            <button onClick={handleDelete} className="border border-red-500 text-red-500 px-4 py-2 rounded-md font-medium hover:bg-red-500 hover:text-white transition">Delete Account</button>
          </div>

          <div className="flex justify-between items-center mt-10 mb-4 border-t border-white/10 pt-6">
            <h2 className="text-2xl font-semibold text-white">My Listings</h2>
            <Link to="/addhouse">
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-400"> + Create New Post</button>
            </Link>
          </div>

          <div className="space-y-6">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div key={post.id} className="relative group">
                  <Link to={`/${post.id}`} className="block">
                    <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 flex gap-4 shadow-md hover:bg-white/40 transition">
                      <img 
                        src={post.images[0] 
                          ? (post.images[0].startsWith("http") ? post.images[0] : `https://shohoz-rent-backend.onrender.com${post.images[0]}`) 
                          : "/apartment2.jpg"} 
                        className="w-40 h-28 rounded-lg object-cover" alt="" 
                      />
                      <div className="text-white flex-1">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <p className="text-sm opacity-90">{post.address}</p>
                        <p className="text-lg font-bold mt-2 text-yellow-300">{post.price} Tk</p>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Link to={`/edit/${post.id}`} className="bg-gray-900 hover:text-gray-900 hover:bg-white text-white px-3 py-1 rounded text-xs transition font-semibold">Edit</Link>
                    <button onClick={(e) => handleDeletePost(e, post.id)} className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition font-semibold">Delete</button>
                  </div>
                </div>
              ))
            ) : (<p className="text-white italic">No posts found. Create one!</p>)}
          </div>
        </div>

        <div className="w-full xl:w-1/3 rounded-xl p-6 bg-black/10 backdrop-blur-sm shadow-xl h-fit">
          <h2 className="text-2xl font-semibold mb-6 text-white">Saved Posts</h2>
          <div className="space-y-6">
            {savedPosts.length > 0 ? (
              savedPosts.map((post) => (
                <Link to={`/${post.id}`} key={post.id} className="block">
                  <div className="bg-white/20 p-4 rounded-xl flex gap-4 hover:bg-white/30 transition shadow-md">
                    <img 
                      src={post.images[0] 
                        ? (post.images[0].startsWith("http") ? post.images[0] : `https://shohoz-rent-backend.onrender.com${post.images[0]}`) 
                        : "/apartment2.jpg"} 
                      className="w-20 h-16 rounded-md object-cover" alt="" 
                    />
                    <div className="text-white">
                      <h4 className="text-sm font-semibold line-clamp-1">{post.title}</h4>
                      <p className="text-xs text-yellow-300 font-bold">{post.price} Tk</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (<p className="text-white italic text-sm text-center">No saved posts yet.</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;