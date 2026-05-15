import React from "react";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-6 space-y-8">
        <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 font-medium">
          <Link to="/admin" className="p-3 hover:bg-gray-800 rounded">Dashboard</Link>
          <Link to="/admin/users" className="p-3 bg-gray-800 rounded">Manage Users</Link>
          <Link to="/admin/posts" className="p-3 hover:bg-gray-800 rounded">Manage Posts</Link>
          <Link to="/admin/messages" className="p-3 hover:bg-gray-800 rounded">User Messages</Link>
        </nav>
      </div>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200 uppercase text-xs font-bold text-gray-600">
              <tr>
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="p-4">Abid Nur</td>
                <td className="p-4">kamolabid950090@gmail.com</td>
                <td className="p-4">12 April 2026</td>
                <td className="p-4"><button className="text-red-500 font-bold">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;