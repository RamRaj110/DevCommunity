import React, { useEffect, } from 'react'
import { BASE_URL } from '../utils/constants' 
import axios from 'axios' 
import { useDispatch, useSelector } from 'react-redux' 
import { addConnection } from '../utils/connectionSlice' 
import { Link } from 'react-router-dom'



const Connections = () => {
 
  
  const connectionData = useSelector((store) => store.connections)
  const dispatch = useDispatch()

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + 'users/connections', {
        withCredentials: true
      })
      dispatch(addConnection(res.data.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])
  

  if (!connectionData) return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 relative overflow-hidden font-sans">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            My Connections ({connectionData.length})
        </h1>

        {connectionData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connectionData.map((item) => (
              <div
                key={item._id}
                className="flex flex-col bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-lg hover:border-slate-600 transition-all duration-300 group"
              >
                {/* Header: Avatar + Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring-2 ring-purple-500/30 ring-offset-2 ring-offset-slate-900">
                      <img
                        src={item.profileImg || "https://geographyandyou.com/images/user-profile.png"}
                        alt="profile"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                      {item.firstName} {item.lastName}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                      {item.gender ?? "Developer"}
                    </p>
                  </div>
                </div>

                {/* About (Truncated) */}
                <div className="flex-grow">
                   {item.about && (
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4 italic">
                      "{item.about}"
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-6">
                    {item.skills?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {item.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-1 text-xs font-medium text-purple-300 bg-purple-900/20 border border-purple-500/20 rounded-md">
                            {skill}
                        </span>
                        ))}
                        {item.skills.length > 3 && (
                             <span className="text-xs text-slate-600 py-1 px-1">+{item.skills.length - 3}</span>
                        )}
                    </div>
                    ) : (
                        <p className="text-xs text-slate-600">No skills listed</p>
                    )}
                </div>

                {/* Footer: Action Buttons */}
                <div className="mt-auto border-t border-slate-800 pt-4 flex gap-3">
                  <Link to={`/chat/${item._id}`} className="flex-1">
                     <button className="flex-1 btn btn-sm bg-blue-600 hover:bg-blue-500 border-none text-white rounded-lg gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                             <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                             <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Message
                     </button>
                    </Link>
                     <button className="btn btn-sm btn-ghost text-slate-400 hover:text-white rounded-lg">
                        View Profile
                     </button>
                    
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800">
             <div className="text-6xl mb-4">🕸️</div>
             <h3 className="text-xl font-semibold text-white">No connections yet</h3>
             <p className="text-slate-500 mt-2">Start swiping on the feed to find matches!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Connections