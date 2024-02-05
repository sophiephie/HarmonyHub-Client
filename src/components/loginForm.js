import React, { useState } from "react";
import axios from "axios";
const siteUrl = process.env.REACT_APP_SITE_URL;

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Send email and password to the server for verification
      const response = await axios.post(
        `${siteUrl}/users/email-login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.data) {
        // Reset form fields
        setEmail("");
        setPassword("");
        const error = response.data.error;
        if (error) {
          // Show the warning banner
          document.getElementById("warningBanner").classList.remove("hidden");
          document.getElementById("warningBanner").innerText = error;
        } else {
          document.getElementById("warningBanner").classList.add("hidden");
          const newUser = response.data.newUser;
          if (newUser) {
            // Redirect to the sign-up page if the user does not exist
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("displayName", "");
            onLoginSuccess(true);
          } else {
            // Set token returned from the server
            const jwtToken = response.data.token;
            // Store JWT token and user-related data in local storage
            localStorage.setItem("jwtToken", jwtToken);
            localStorage.setItem("displayName", response.data.displayName);
            localStorage.setItem("email", response.data.email);
            onLoginSuccess(false);
          }
        }
      } else {
        console.log("Error happened");
      }
    } catch (error) {
      console.error("Error during email login:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div
        id="warningBanner"
        className="hidden bg-yellow-500 p-4 rounded-md mb-4"
      >
        Warning: There was an error during login.
      </div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black bg-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black bg-white"
      />
      <button
        type="button"
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-blue-300"
        onClick={() => onLoginSuccess(true)}
      >
        Create an Account
      </button>
    </div>
  );
};

export default LoginForm;
