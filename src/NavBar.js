import React, { useState } from "react";
import Logo from "./assets/logo-no-background.png";
import { GoogleLogin } from "@react-oauth/google";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8 w-50 mr-2" />
        </div>
        <div className="flex-grow justify-start">
          <div className="flex justify-between">
            <div>
              <a href="#" className="text-white ml-20">
                Discover
              </a>
              <a href="#" className="text-white ml-10">
                Genre
              </a>
            </div>

            <div className="w-150">
              <button
                onClick={toggleDropdown}
                className="text-white w-150 text-left px-4 py-2 rounded focus:outline-none focus:shadow-outline"
              >
                Login/Create an Account
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white p-2 rounded shadow-lg">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
