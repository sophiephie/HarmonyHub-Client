import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("displayName")
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Send the sign-up data to the server
      const response = await axios.post(
        "http://localhost:3001/api/users/signup",
        {
          displayName,
          username,
          email,
          password,
        }
      );

      if (response && response.data) {
        // Handle successful sign-up and navigate back to home
        navigate("/");
      } else {
        console.log("Error happened during creation");
        alert("Error during creation...");
      }
    } catch (error) {
      console.error("Error during user sign up:", error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black"
          />
        </div>
        <div className="mt-14 flex items-center justify-between">
          <button
            type="button"
            onClick={handleSignUp}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
