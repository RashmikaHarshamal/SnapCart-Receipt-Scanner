import React, { useState } from 'react';

export default function Admin() {
  const [users] = useState([
    { id: 1, first: "John", last: "Doe", email: "john@example.com", created: "2025-09-17 10:00 AM" },
    { id: 2, first: "Jane", last: "Smith", email: "jane@example.com", created: "2025-09-16 09:30 AM" },
    { id: 3, first: "Alice", last: "Johnson", email: "alice@example.com", created: "2025-09-15 08:45 AM" },
  ]);

  return (
    <div className="bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-wide">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-purple-100">
            Manage all registered users
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="min-w-full border-collapse rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Last Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-purple-50 hover:bg-purple-100" : "bg-pink-50 hover:bg-pink-100"}
                >
                  <td className="py-3 px-6 font-medium">{user.id}</td>
                  <td className="py-3 px-6">{user.first}</td>
                  <td className="py-3 px-6">{user.last}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.created}</td>
                  <td className="py-3 px-6">
                    <button 
                      onClick={() => {
                        // Add delete functionality here
                        alert(`Delete user ${user.id}`);
                      }}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-purple-600">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Today</h3>
            <p className="text-3xl font-bold text-pink-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Receipts</h3>
            <p className="text-3xl font-bold text-red-600">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
