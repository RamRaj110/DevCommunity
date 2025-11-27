import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    profileImg,
    age,
    gender,
    about,
    skills,
  } = user;

  const displayImage =
    profileImg ||
    photoUrl ||
    "https://geographyandyou.com/images/user-profile.png";

  const dispatch = useDispatch();

  const handleSendReq = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (error) {
      console.log("send req error" + error);
    }
  };

  return (
    <div className="relative w-96 max-w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300 group">
      <div className="h-32 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-90 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
      </div>

      {/* Avatar Section */}
      <div className="flex justify-center -mt-16 relative z-10">
        <div className="p-1 rounded-full bg-slate-950 shadow-xl">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 ring-2 ring-purple-500/50 shadow-lg">
            <img
              src={displayImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="px-6 pt-4 pb-8 text-center">
        {/* Name */}
        <h2 className="text-3xl font-bold text-white tracking-tight mb-1">
          {firstName} {lastName}
        </h2>

        {/* Gender & Badge */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
            {gender || "Developer"}
          </span>
          {age && <span className="text-xs text-slate-500">Age: {age}</span>}
        </div>

        {/* About Section */}
        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 mb-6 shadow-inner min-h-[80px] flex items-center justify-center">
          <p className="text-slate-400 text-sm leading-relaxed italic line-clamp-3">
            "{about || "Code enthusiast. Looking for bugs and coffee."}"
          </p>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Tech Stack
          </h3>

          {!skills || skills.length === 0 ? (
            <p className="text-slate-600 text-sm">No skills added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold text-blue-300 bg-blue-900/20 border border-blue-500/30 rounded-lg hover:bg-blue-900/40 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleSendReq("ignored", _id)}
            className="group flex flex-col items-center gap-1 focus:outline-none"
          >
            <div className="w-14 h-14 rounded-full border-2 border-slate-700 bg-slate-800/50 flex items-center justify-center text-red-500 group-hover:bg-slate-800 group-hover:border-red-500 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-red-500 transition-colors">
              Ignore
            </span>
          </button>

          <button
            onClick={() => handleSendReq("interested", _id)}
            className="group flex flex-col items-center gap-1 focus:outline-none"
          >
            <div className="w-14 h-14 rounded-full border-none bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-purple-500/40 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-purple-400 transition-colors">
              Interested
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
