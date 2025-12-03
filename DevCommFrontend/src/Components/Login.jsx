import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(BASE_URL + 'login', {
        email,
        password
      }, {
        withCredentials: true,
      });
      dispatch(addUserInfo(res.data.user));
      navigate('/feed');
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
    }


  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");


    try {
      const res = await axios.post(BASE_URL + 'signup', {
        firstName,
        lastName,
        email,
        password
      }, {
        withCredentials: true,
      });
      dispatch(addUserInfo(res.data.user));
      navigate('/edit');
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
    }

  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">

      {/* --- Background Effects (Matches Hero) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">

        {/* --- Form Card --- */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 sm:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {isSignUp ? "Join the community of developers." : "Sign in to continue matching."}
            </p>
          </div>

          <form className="space-y-6" onSubmit={isSignUp ? handleSignUp : handleSubmit}>

            {/* Name Fields (Only for SignUp) */}
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4 animate-fade-in-down">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full rounded-lg bg-slate-950/50 border border-slate-700 text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full rounded-lg bg-slate-950/50 border border-slate-700 text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500">✉️</span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 rounded-lg bg-slate-950/50 border border-slate-700 text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="developer@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500">🔒</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 rounded-lg bg-slate-950/50 border border-slate-700 text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-800 text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-200"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>

            {/* Toggle Login/Signup */}
            <div className="text-center mt-4">
              <p className="text-sm text-slate-400">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
                >
                  {isSignUp ? "Log in" : "Sign up"}
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}