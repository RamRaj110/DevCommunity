import React, { useEffect,  } from "react";
import { useNavigate } from "react-router-dom"; 

import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed,  } from "../utils/feedSlice";
import UserCard from "./UserCard";


const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) return; 
    
    try {
      const res = await axios.get(BASE_URL + "feed", { withCredentials: true });
      dispatch(addFeed(res.data));

   
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

 

  // --- 1. Loading State ---
  if (!feed) return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
          <span className="loading loading-infinity loading-lg text-purple-500"></span>
      </div>
  );

  // --- 2. Empty State ---
  if (feed.length <= 0) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-950 text-center px-4 font-sans text-white">
             <div className="text-6xl mb-4 animate-bounce">🎉</div>
             <h1 className="text-3xl font-bold mb-2">That's everyone!</h1>
             <p className="text-slate-400 max-w-md">
                 You've viewed all available profiles. Check back later for more developers.
             </p>
             <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500/10 transition-colors"
             >
                Refresh Feed
             </button>
        </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 overflow-hidden relative font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
      </div>

      {/* The User Card Stack */}
      <div className="z-10 mt-[-20px]">
        {/* We only render the FIRST user in the array (Tinder style stack) */}
        {feed[0] && (
            <UserCard 
                user={feed[0]} 
            />
        )}
      </div>

    </div>
  );
};

export default Feed;