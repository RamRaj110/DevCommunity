import React, {  } from "react";
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
const Profile = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.userInfo.userInfo);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950 text-slate-400">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
        <span className="ml-4">Loading profile...</span>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    email,
    age,
    gender,
    about,
    profileImg,
    skills = [],
    createdAt,
    updatedAt,
  } = user;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleEditClick = () => {
    navigate('/edit');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header Gradient Banner */}
        <div className="h-40 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-90 relative">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
        </div>

        {/* Avatar Section */}
        <div className="flex justify-center -mt-20 relative">
          <div className="p-1.5 rounded-full bg-slate-950 shadow-2xl">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-slate-800 ring-2 ring-purple-500/50 shadow-inner bg-slate-800">
              <img
                src={profileImg || "https://geographyandyou.com/images/user-profile.png"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="px-8 pt-6 pb-10 text-center">
          
          {/* Name & Age */}
          <h2 className="text-4xl font-bold text-white tracking-tight mb-2">
            {firstName} {lastName}
          </h2>
          <div className="flex justify-center gap-3 text-slate-400 text-sm mb-6">
             {age && <span className="flex items-center gap-1">🎂 {age} years old</span>}
             {gender && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                  {/* Gender Icon */}
                   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
                   {gender}
                </span>
             )}
          </div>

          {/* Email */}
          <div className="flex justify-center items-center gap-2 mb-6 text-blue-400 bg-blue-900/10 py-2 px-4 rounded-lg border border-blue-900/30 inline-flex">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">{email}</span>
          </div>

          {/* About Section */}
          <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/50 mb-8 text-left shadow-inner">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">About</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {about || "No bio added yet."}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-8 text-left">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Skills</h3>
            {skills.length === 0 ? (
              <p className="text-slate-600 text-sm italic">No skills added yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-xs font-semibold text-purple-300 bg-purple-900/20 border border-purple-500/30 rounded-lg shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 border-t border-slate-800 pt-6 mb-8">
            <div className="flex flex-col items-center">
               <span className="mb-1 uppercase tracking-wide opacity-70">Joined</span>
               <div className="flex items-center gap-1.5 text-slate-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {createdAt ? formatDate(createdAt) : "N/A"}
               </div>
            </div>
            <div className="flex flex-col items-center border-l border-slate-800">
               <span className="mb-1 uppercase tracking-wide opacity-70">Last Updated</span>
               <div className="flex items-center gap-1.5 text-slate-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {updatedAt ? formatDate(updatedAt) : "N/A"}
               </div>
            </div>
          </div>

          {/* Edit Button */}
          <button 
            onClick={handleEditClick} 
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  );
};

export default Profile;