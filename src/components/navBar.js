import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-no-background.png";
import { GoogleLogin } from "@react-oauth/google";
import Home from "../pages/home";
import SignUpPage from "../pages/signup";
import Dashboard from "../pages/userDash";
import EmailLoginForm from "./loginForm";
import Discover from "../pages/discover";
import axios from "axios";
import AddSong from "../pages/addsong";
import SongPlayer from "../pages/songPlayer";

const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a valid JWT token is present in local storage and set if user is logged in
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken !== "undefined") {
      setIsLoggedIn(!!jwtToken);
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Send the token to the server for verification
      const response = await axios.post(
        "http://localhost:3001/users/google-login",
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
        const newUser = response.data.newUser;
        const jwtToken = response.data.token;

        // Store JWT token and display name in local storage
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("displayName", response.data.displayName);
        localStorage.setItem("email", response.data.email);

        setIsLoggedIn(true);

        if (newUser) {
          // Redirect to the sign-up page if the user does not exist
          navigate("/signup");
        }
        setShowDropdown(false);
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

  const handleLogout = () => {
    // Clear the JWT token and user-related data from local storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("displayName");
    localStorage.removeItem("email");

    setIsLoggedIn(false);

    // Redirect to the home page or any other page after logout
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-8 w-50 mr-2" />
            </Link>
          </div>

          <div className="flex-grow justify-start">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row">
                <div className="text-white ml-20">
                  <Link to="/">Home</Link>
                </div>
                <div className="text-white ml-20">
                  <Link to="/discover">Discover</Link>
                </div>
                <div className="text-white ml-20">
                  <Link to="/">Genre</Link>
                </div>
                {isLoggedIn && (
                  <div className="text-white ml-20">
                    <Link to="/dashboard">Dashboard</Link>
                  </div>
                )}
                {isLoggedIn && (
                  <div className="text-white ml-20">
                    <Link to="/addsong">Add a Song</Link>
                  </div>
                )}
              </div>
              {/* Show log out button if the user is logged in, otherwise show login button */}
              <div className="w-150">
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-blue-300"
                  >
                    Sign out
                  </button>
                ) : (
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
                )}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white p-2 rounded shadow-lg">
                    <EmailLoginForm
                      onLoginSuccess={(newUser) => {
                        if (newUser) {
                          setShowDropdown(false);
                          navigate("/signup");
                        } else {
                          setIsLoggedIn(true);
                          navigate(0);
                        }
                      }}
                    />
                    <hr className="w-full border-t border-gray-300 mt-4 mb-4" />
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
        <Route path="/discover" element={<Discover />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/addsong" element={<AddSong />} />
        <Route path="/songs/:songId" element={<SongPlayer />} />
      </Routes>
    </div>
  );
};

export default NavBar;
