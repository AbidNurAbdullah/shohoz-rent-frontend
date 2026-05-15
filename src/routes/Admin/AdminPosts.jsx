import React from "react";
import { Link } from "react-router-dom";

const AdminPosts = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-6 space-y-8">
        <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 font-medium">
          <Link to="/admin" className="p-3 hover:bg-gray-800 rounded">Dashboard</Link>
          <Link to="/admin/users" className="p-3 hover:bg-gray-800 rounded">Manage Users</Link>
          <Link to="/admin/posts" className="p-3 bg-gray-800 rounded">Manage Posts</Link>
          <Link to="/admin/messages" className="p-3 hover:bg-gray-800 rounded">User Messages</Link>
        </nav>
      </div>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Property Listings</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 italic">Property lists will be fetched from Database here...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;