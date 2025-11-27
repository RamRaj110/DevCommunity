import React from 'react';
import { Link, useRouteError, useLocation } from 'react-router-dom';

const Error = () => {
  const error = useRouteError(); 
  const location = useLocation(); 
  console.error(error);

  const is404 = !error;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
      </div>

      <div className="relative z-10 text-center bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md mx-auto">
        <div className="text-6xl mb-6 animate-shake">
          {is404 ? "🔍" : "🚨"}
        </div>
        <h1 className="text-4xl font-bold text-red-400 mb-4">
          {is404 ? "Page Not Found" : "Oops! Something went wrong."}
        </h1>
        <p className="text-slate-300 text-lg mb-6">
          {is404
            ? `The page "${location.pathname}" doesn't exist.`
            : (error?.statusText || error?.message || "An unexpected error has occurred.")
          }
        </p>
        <p className="text-slate-400 text-sm mb-8">
          {is404
            ? "The link might be broken or the page may have been moved."
            : "We're sorry for the inconvenience. Please try navigating back or refreshing the page."
          }
        </p>
        <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:-translate-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go to Homepage
        </Link>
      </div>

    </div>
  );
};

export default Error;
