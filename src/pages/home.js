import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LandingImage from "../assets/landing-image.png";

const Home = () => {
  return (
    <div>
      <div className="relative h-screen">
        <img
          src={LandingImage}
          alt="Landing Page Background"
          className="absolute inset-0 object-cover w-full"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-6xl font-bold mb-4">HarmonyHub</h1>
            <p className="text-xl">Where Music Meets Freedom</p>
            <div className="flex items-center justify-center mt-8">
              <Link to="/discover">
                <button className="bg-blue-500 text-white w-48 h-12 flex items-center justify-center rounded-md hover:bg-blue-700 transition duration-300">
                  Explore Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
