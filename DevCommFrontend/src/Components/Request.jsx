import React, { useEffect, } from 'react'
import { BASE_URL } from '../utils/constants' 
import { useDispatch, useSelector } from 'react-redux' 
import { addRequest, removeRequest } from '../utils/requestSlice' 
import axios from 'axios' 


function Request() {

  
  const dispatch = useDispatch()
  const requestData = useSelector((store) => store.requests)

  const reviewRequest = async (status, _id ) => {
    try {
        await axios.post(BASE_URL + "request/review/" + status + "/" + _id , {}, { withCredentials: true })
        dispatch(removeRequest(_id))
    } catch (error) {
        console.log("review request error" + error)
    }
  }

  const fetchReq = async () => {
    try {
        const res = await axios.get(BASE_URL + "users/requests/received", { withCredentials: true })
        dispatch(addRequest(res.data.data))
    } catch (error) {
        console.log("request error" + error)
    }
  }

  useEffect(() => {
    fetchReq()
  }, [])
  



  if (!requestData) return (
     <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <span className="loading loading-spinner text-purple-500"></span>
     </div>
  );

  if (requestData.length === 0) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-950 text-white">
             <div className="bg-slate-900/50 p-6 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
             </div>
             <h1 className="text-2xl font-bold">No Pending Requests</h1>
             <p className="text-slate-400 mt-2">Go to the feed to connect with more developers.</p>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Connection Requests ({requestData.length})
            </h1>

            <div className="space-y-4">
                {requestData.map((item) => {
                    const { firstName, lastName, gender, about, profileImg, skills } = item.fromUserId;
                    // const requestId = item.fromUserId._id;
                     console.log(item._id) // The ID of the request itself


                    return (
                        <div
                            key={item._id}
                            className="flex flex-col sm:flex-row items-center gap-6 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-lg hover:border-slate-700 transition-all duration-300"
                        >
                            {/* Left - Profile Image */}
                            <div className="shrink-0">
                                <div className="avatar">
                                    <div className="w-24 h-24 rounded-full ring-2 ring-purple-500/30 ring-offset-2 ring-offset-slate-900 shadow-md">
                                        <img
                                            src={profileImg || "https://geographyandyou.com/images/user-profile.png"}
                                            alt="profile"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Middle - Info */}
                            <div className="flex-1 text-center sm:text-left min-w-0">
                                <h2 className="text-xl font-bold text-white truncate">
                                    {firstName} {lastName}
                                </h2>

                                <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide">
                                    {gender ?? "Developer"}
                                </p>

                                {about && (
                                    <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                                        {about}
                                    </p>
                                )}

                                {/* Skills Badges */}
                                {skills?.length > 0 && (
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                        {skills.slice(0, 4).map((skill, i) => (
                                            <span key={i} className="px-2 py-1 text-xs font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 rounded-md">
                                                {skill}
                                            </span>
                                        ))}
                                        {skills.length > 4 && (
                                            <span className="text-xs text-slate-500 pt-1">+{skills.length - 4} more</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Right - Actions */}
                            <div className="flex sm:flex-col gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                                <button 
                                    className="btn flex-1 sm:flex-none bg-gradient-to-r from-red-600/10 to-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all rounded-xl"
                                    onClick={() => reviewRequest('rejected', item._id)}
                                >
                                    Reject
                                </button>
                                <button 
                                    className="btn flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-emerald-600 text-white border-none hover:from-green-500 hover:to-emerald-500 shadow-lg shadow-green-900/20 transition-all rounded-xl"
                                    onClick={() => reviewRequest('accepted', item._id)}
                                >
                                    Accept
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default Request