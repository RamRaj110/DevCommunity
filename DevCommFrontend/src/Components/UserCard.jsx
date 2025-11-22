import axios from "axios";
import { FaVenusMars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({user})=> {

  const {
    firstName,
    lastName,
    gender,
    about,
    profileImg,
    skills = [],
    _id
  } = user;
 const dispatch=useDispatch()

  const handleSendReq= async(status,_id)=>{
    try {
      await axios.post(BASE_URL+"request/send/"+status+"/"+_id,{},{withCredentials:true})
   dispatch(removeFeed(_id))
    } catch (error) {
      console.log("send req error"+error)
    }
  }
  useEffect(() => {
    handleSendReq()
  }, [])  


  return (
    user &&
    <div className="max-w-lg mx-auto bg-base-300 rounded-2xl shadow-xl overflow-hidden mt-3 border border-base-200">

      <div className="bg-gradient-to-r from-primary to-secondary h-32 w-full"></div>
      {/* Avatar */}
      <div className="avatar -mt-16 flex justify-center">
        <div className="w-32 rounded-full ring ring-base-100 ring-offset-2 shadow-md">
          <img src={profileImg} alt="profile" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 text-center">

        {/* Name */}
        <h2 className="text-2xl font-bold">
          {firstName} {lastName}
        </h2>

        {/* Gender */}
        <p className="text-base-content/70 flex justify-center items-center gap-2 mt-1">
          <FaVenusMars /> {gender}
        </p>


        {/* About Section */}
        <div className="mt-4 bg-base-200 p-3 rounded-lg shadow-inner">
          <p className="text-base-content/80 text-sm">{about}</p>
        </div>

        {/* Skills */}
        <div className="mt-5">
          <h3 className="font-semibold text-base-content">Skills</h3>

          {skills.length === 0 ? (
            <p className="text-base-content/60 text-sm mt-1">No skills added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-primary badge-outline px-3 py-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-center gap-4">
   <button className="btn btn-outline btn-secondary" onClick={()=>handleSendReq("ignore",_id)}>Ignore</button>
    <button className="btn btn-outline btn-success" onClick={()=>handleSendReq("intrested",_id)}>Intrest</button>   
        </div>
  
 </div>
    </div>

  );
};



export default UserCard
