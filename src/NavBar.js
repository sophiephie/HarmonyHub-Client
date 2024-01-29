import React, { useState } from "react";
import { Route, Routes, Link, useNavigate, Router } from "react-router-dom";
import Logo from "./assets/logo-no-background.png";
import { GoogleLogin } from "@react-oauth/google";
import Home from "./pages/home";
import SignUpPage from "./pages/signup";
import Dashboard from "./pages/userDash";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const displayWelcomeMessage = (displayName) => {
    alert(`Welcome Back ${displayName}`);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    try {
      // Send the token to server for verification
      const response = await axios.post(
        "http://localhost:3001/api/users/google-login",
        {
          googleToken: credentialResponse.credential,
          clientId: credentialResponse.clientId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.data) {
        // Set token returned from server
        console.log(response);
        const newUser = response.data.newUser;
        const jwtToken = response.data.token;

        // Store JWT token and display name in local storage
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("displayName", response.data.displayName);

        if (newUser) {
          // Redirect to sign up page if user does not exist

          navigate("/signup");
        } else {
          displayWelcomeMessage(response.data.displayName);
        }
      } else {
        console.log("Error happened");
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 w-50 mr-2" />
          </div>

          <div className="flex-grow justify-start">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row">
                <div className="text-white ml-20">
                  <Link to="/">Home</Link>
                </div>
                <div className="text-white ml-20">
                  <Link to="/">Discover</Link>
                </div>
                <div className="text-white ml-20">
                  <Link to="/">Genre</Link>
                </div>
                <div className="text-white ml-20">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              </div>
              <div className="w-150">
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-blue-300"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  Login/Create an Account
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white p-2 rounded shadow-lg">
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default NavBar;
