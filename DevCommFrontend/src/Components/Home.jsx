import React from "react";
import { Link } from "react-router-dom"; // Change to "react-router" if your setup requires it

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      
      {/* --- Background Decorative Blobs --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-pink-600 rounded-full mix-blend-screen filter blur-[90px] opacity-20"></div>
      </div>

      {/* --- Main Content Container --- */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center sm:pt-32 sm:px-6 lg:px-8">
        
        {/* Badge / Tag */}
        <div className="inline-flex items-center px-3 py-1 mb-8 text-sm font-medium text-blue-300 transition-colors border border-blue-500/30 rounded-full bg-blue-900/20 backdrop-blur-sm hover:bg-blue-900/30 cursor-default">
          <span className="flex h-2 w-2 relative mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          The #1 Matchmaking for Developers
        </div>

        {/* Hero Headline */}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-6">
          <span className="block text-white">Code. Connect.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 pb-4">
            Create Together.
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-400 sm:text-xl">
          Stop coding alone. Match with other developers based on tech stack, 
          experience, and interests. Find your next hackathon partner or open-source contributor today.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col w-full gap-4 mt-10 sm:flex-row sm:justify-center sm:w-auto">
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl hover:from-pink-500 hover:to-purple-500 shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 border border-transparent">
              Create Account
            </button>
          </Link>
          
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full px-8 py-4 text-lg font-semibold text-slate-300 transition-all duration-200 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl hover:bg-slate-800 hover:text-white transform hover:-translate-y-1">
              Log In
            </button>
          </Link>
        </div>
      </div>

      {/* --- Feature Cards Section --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            
            {/* Feature 1 */}
            <div className="p-8 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🔥
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Swipe Logic</h3>
                <p className="text-slate-400">
                  Our algorithm matches you based on skills. React developer? 
                  We'll pair you with a MERN stack expert or a UI designer.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 group">
                 <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  💬
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Real-time Chat</h3>
                <p className="text-slate-400">
                  Instant messaging powered by Socket.io. Discuss architecture, 
                  share GitHub repos, and plan your next big project.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl hover:border-pink-500/50 transition-all duration-300 group">
                 <div className="w-12 h-12 bg-pink-900/50 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Community First</h3>
                <p className="text-slate-400">
                  Build connections that matter. From Junior devs looking for mentorship 
                  to Seniors looking for co-founders.
                </p>
            </div>

        </div>
      </div>

    </div>
  );
};

export default Hero;