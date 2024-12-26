import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFun,
  registerFun,
  setLoading,
  setError,
} from "../redux/slices/user.slice"; // Your actions
import axios from "axios";
import Cookies from "js-cookie"; // For cookies
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function
  const [isSignIn, setIsSignIn] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoadingState] = useState(false); // Manage loading state
  const [error, setErrorState] = useState(null); // Manage error state

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true); // Set loading to true when submitting
    dispatch(setLoading(true)); // Set Redux loading state

    const formData = {
      email,
      password,
      ...(isSignIn ? {} : { confirmPassword }), // Only add confirmPassword for sign up
    };

    console.log("Formdata in loginRegister ", formData);

    try {
      let response;
      if (isSignIn) {
        response = await axios.post(
          "http://localhost:3000/api/users/login",
          formData
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/api/users/register",
          formData
        );
      }

      const { accessToken:token , user:userData } = response.data.data;
      console.log("Response.data is ", response.data.data);

      // Dispatch login/register action to Redux store
      console.log("isSignIn ", isSignIn);
      if (isSignIn) {
        dispatch(loginFun({ userData, token }));
      } else {
        dispatch(registerFun({ userData, token }));
      }

      // Save token in cookies
      Cookies.set("idToken", token, { expires: 1 }); // Set token with expiry of 1 day
      Cookies.set("email", email, { expires: 1 });

      // Reset form and error state
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorState(null);

      // Navigate to the home page after successful login/registration
      navigate("/"); // Redirect to the home page
    } catch (err) {
      console.log("Error in handlesubmit: ", err); // Log the entire error
      console.log("Error response: ", err.response); // Log the error response for more details
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong!")
      ); // Set error in Redux
      setErrorState(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoadingState(false); // Set loading to false after API call is done
      dispatch(setLoading(false)); // Reset Redux loading state
    }
  };

  return (
    <div className="flex justify-center mt-12 min-h-min items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <ul className="flex justify-center space-x-4">
            <li>
              <button
                className={`font-semibold text-lg p-2 rounded-md ${
                  isSignIn ? "bg-gray-800 text-white" : "text-gray-700"
                }`}
                onClick={toggleForm}
              >
                Sign In
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-lg p-2 rounded-md ${
                  !isSignIn ? "bg-gray-800 text-white" : "text-gray-700"
                }`}
                onClick={toggleForm}
              >
                Sign Up
              </button>
            </li>
          </ul>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {!isSignIn && (
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {!isSignIn && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
                required
              />
              <label className="text-sm text-gray-600">
                I agree to the terms and conditions
              </label>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <div className="text-center mt-4">
            {isSignIn ? (
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                Forgot your password?
              </a>
            ) : null}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              {isSignIn ? "Sign up here" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
