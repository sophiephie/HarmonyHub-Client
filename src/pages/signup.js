import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const siteUrl = process.env.REACT_APP_SITE_URL;

const SignUpPage = () => {
  const [displayName, setDisplayName] = useState(localStorage.getItem("displayName") || "");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    displayName: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignUp = async () => {
    try {
      // Validate form using Yup
      await validationSchema.validate({ email, displayName, username, password }, { abortEarly: false });

      // Send the sign-up data to the server
      const response = await axios.post(`${siteUrl}/users/signup`, {
        displayName,
        username,
        email,
        password,
      });

      if (response && response.data) {
        // Store JWT token and display name in local storage
        const jwtToken = response.data.token;
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("displayName", response.data.displayName);
        localStorage.setItem("email", response.data.email);
        // Handle successful sign-up and navigate back to home
        navigate("/");
      } else {
        console.log("Error happened during creation");
        setErrors({ server: "Error during creation..." });
      }
    } catch (error) {
      console.error("Error during user sign up:", error);

      // Display Yup validation errors
      if (error.name === "ValidationError") {
        const yupErrors = {};
        error.inner.forEach((err) => {
          yupErrors[err.path] = err.message;
        });
        setErrors(yupErrors);
      } else {
        setErrors({ server: error.response.data.error });
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {errors.server && (
          <div className="mb-4 p-2 bg-red-500 text-white rounded-md text-center">
            {errors.server}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black bg-white"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black bg-white"
          />
          {errors.displayName && (
            <div className="text-red-500 text-sm mt-1">{errors.displayName}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black bg-white"
          />
          {errors.username && (
            <div className="text-red-500 text-sm mt-1">{errors.username}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mt-1 p-2 w-full border rounded-md placeholder-gray-500 text-black bg-white"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
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
