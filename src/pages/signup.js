import React, { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("displayName")
  );
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    try {
      // Send the sign-up data to the server
      const response = await axios.post(
        "http://localhost:3001/api/users/signup",
        {
          displayName,
          username,
        }
      );

      if (response && response.data) {
        // Handle successful sign-up, e.g., show a success message
        console.log(response.data);
      } else {
        console.log("Error happened during sign-up");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
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
