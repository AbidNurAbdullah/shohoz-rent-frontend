import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    messages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await apiRequest.get("/admin/users");
        const postsRes = await apiRequest.get("/admin/posts");
        const msgRes = await apiRequest.get("/admin/messages");

        setStats({
          users: usersRes.data.length,
          posts: postsRes.data.length,
          messages: msgRes.data.length,
        });
        setIsLoading(false);
      } catch (err) {
        console.log("Error fetching stats:", err);
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-8">
        <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 font-medium">
          <Link to="/admin" className="p-3 bg-gray-800 rounded">Dashboard</Link>
          <Link to="/admin/users" className="p-3 hover:bg-gray-800 rounded">Manage Users</Link>
          <Link to="/admin/posts" className="p-3 hover:bg-gray-800 rounded">Manage Posts</Link>
          <Link to="/admin/messages" className="p-3 hover:bg-gray-800 rounded">User Messages</Link>
          <Link to="/" className="p-3 text-red-400 hover:bg-gray-800 rounded mt-10">Back to Website</Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Shohoz Rent Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-md border-l-8 border-blue-500">
            <h3 className="text-gray-500 font-semibold uppercase">Total Users</h3>
            <p className="text-4xl font-bold mt-2 font-mono">
              {isLoading ? "..." : stats.users}
            </p> 
            <Link to="/admin/users" className="text-blue-500 text-sm mt-4 inline-block">View Users List →</Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border-l-8 border-green-500">
            <h3 className="text-gray-500 font-semibold uppercase">Total Properties</h3>
            <p className="text-4xl font-bold mt-2 font-mono">
              {isLoading ? "..." : stats.posts}
            </p>
            <Link to="/admin/posts" className="text-green-500 text-sm mt-4 inline-block">View All Posts →</Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border-l-8 border-yellow-500">
            <h3 className="text-gray-500 font-semibold uppercase">New Messages</h3>
            <p className="text-4xl font-bold mt-2 font-mono">
              {isLoading ? "..." : stats.messages}
            </p>
            <Link to="/admin/messages" className="text-yellow-600 text-sm mt-4 inline-block">Read Inbox →</Link>
          </div>
        </div>

        <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Admin Instructions</h2>
            <p className="text-gray-600">Welcome to the Admin Dashboard. Here you can monitor all activities of Shohoz Rent. From this panel, you can manage user data and property listings. The data shown above is synced in real-time with your Database.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;