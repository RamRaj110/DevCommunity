import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector,  } from 'react-redux'
import {addRequest, removeRequest} from '../utils/requestSlice'
import axios from 'axios'



function Request() {
    const dispatch = useDispatch()
    const requestData= useSelector((store)=>store.requests)

    const reviewRequest=async(status,_id)=>{
      try {
         await axios.post(BASE_URL+"request/review/"+status+"/"+_id,{},{withCredentials:true})
        dispatch(removeRequest(_id))
      } catch (error) {
        console.log("review request error"+error)
      }
    }

    const fetchReq = async()=>{
       try {
         const res = await axios.get(BASE_URL+"users/requests/received",{withCredentials:true})
         console.log(res.data.data,"reqdata")
        dispatch(addRequest(res.data.data))

       } catch (error) {
        console.log("request eroor"+error)
       }
    }

    useEffect(() => {
      fetchReq()
    }, [])
    
    if(!requestData) return;
    if(requestData.length===0){
      return <h1 className="text-2xl text-center p-2 font-bold">No Requests</h1>
    }

  return (
    <>
    <h1 className="text-2xl text-center p-2 font-bold">Requests Connectons</h1>
    {
    requestData.map((item) =>
    {const {firstName,lastName,gender,about,profileImg,_id,skills}=item.fromUserId
      return(
      
      <div
        key={_id}
        className="border border-base-300 rounded-2xl p-4 m-4 shadow-xl bg-base-200 hover:bg-base-300 transition-all w-1/2 mx-auto"
      >
        <div className="flex items-center gap-4">
          {/* Left - Profile Image */}
          <img
            src={profileImg}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
          />

          {/* Right - Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold">
              {firstName} {lastName}
            </h2>

            <p className="text-sm opacity-70">
              {gender ?? "Not specified"}
            </p>

            {about && (
              <p className="text-sm mt-1 text-base-content/80">
                {about}
              </p>
            )}

            {/* Skills Badges */}
            {skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, i) => (
                  <div key={i} className="badge badge-primary badge-outline">
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='ml-auto flex flex-col gap-2'>
    <button className="btn btn-outline btn-success" onClick={()=>reviewRequest("accepted",item._id)}>Accept</button>
     <button className="btn btn-outline btn-secondary" onClick={()=> reviewRequest('rejected',item._id)}>Reject</button>
          </div>
        
        </div>
      </div>

    )})
    }
  </>
  )
}

export default Request