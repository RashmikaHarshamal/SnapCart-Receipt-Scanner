import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

export default function Admin() {
  // State to hold data for charts
  const [loginData, setLoginData] = useState([]);
  const [userStatusData, setUserStatusData] = useState([]);

  // Dummy data (replace with API data later)
  useEffect(() => {
    // Example of fetching data (replace with actual API calls)
    setLoginData([
      { date: "Sep 11", logins: 20 },
      { date: "Sep 12", logins: 35 },
      { date: "Sep 13", logins: 50 },
      { date: "Sep 14", logins: 28 },
      { date: "Sep 15", logins: 40 },
      { date: "Sep 16", logins: 60 },
      { date: "Sep 17", logins: 45 },
    ]);

    setUserStatusData([
      { name: "Active", value: 85 },
      { name: "Inactive", value: 15 },
    ]);
  }, []);

  const COLORS = ["#34d399", "#f87171"]; // green, red

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
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-2xl font-bold text-purple-600">120</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-gray-500 text-sm">Active Today</h3>
            <p className="text-2xl font-bold text-green-500">45</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-gray-500 text-sm">New This Week</h3>
            <p className="text-2xl font-bold text-pink-500">10</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Line Chart: Daily Logins */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Daily Logins</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={loginData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="logins"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart: Active vs Inactive */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">User Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Table */}
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
              {[{
                  id: 1,
                  first: "John",
                  last: "Doe",
                  email: "john@example.com",
                  created: "2025-09-17 10:00 AM",
                },
                {
                  id: 2,
                  first: "Jane",
                  last: "Smith",
                  email: "jane@example.com",
                  created: "2025-09-16 09:30 AM",
                },
                {
                  id: 3,
                  first: "Alice",
                  last: "Johnson",
                  email: "alice@example.com",
                  created: "2025-09-15 08:45 AM",
                },
              ].map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    index % 2 === 0
                      ? "bg-purple-50 hover:bg-purple-100"
                      : "bg-pink-50 hover:bg-pink-100"
                  }
                >
                  <td className="py-3 px-6 font-medium">{user.id}</td>
                  <td className="py-3 px-6">{user.first}</td>
                  <td className="py-3 px-6">{user.last}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.created}</td>
                  <td className="py-3 px-6">
                    <button className="text-red-500 hover:text-red-700 font-semibold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
