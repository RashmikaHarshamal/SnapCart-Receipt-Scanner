import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "./login.png";

export default function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/login", {
        username,
        password,
      });
      if (response.data) {
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Error logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 font-sans">
      <div className="flex bg-white shadow-2xl rounded-2xl overflow-hidden w-[900px]">
        <div className="w-1/2">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8 text-center">
            <span className="text-blue-800">Log</span>
            <span className="text-green-600">In</span>
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-1">User Name</label>
              <input
                type="text"
                placeholder="Enter User ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-lime-500 text-white py-2 rounded-lg hover:bg-lime-400 transition duration-300"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <a href="#" className="text-blue-800 hover:underline">
              Forgot Your Password?
            </a>
            <br />
            <span>
              If you haven't an account,{" "}
              <Link to="/register" className="text-green-600 hover:underline">
                Click here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
