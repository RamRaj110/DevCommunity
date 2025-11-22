import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'


const Connections = ()=>{
    const connectionData= useSelector((store)=>store.connections)

   const dispatch =useDispatch()
    const fetchConnections= async()=>{
        try{const res = await axios.get(BASE_URL+'users/connections',
            {withCredentials:true})
            // console.log(res.data.data)
            dispatch(addConnection(res.data.data))
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if(!connectionData) return;
  
    
    return(
<>
  <h1 className="text-2xl text-center p-2 font-bold">Connections</h1>

  {connectionData.length > 0 ? (
    connectionData.map((item) => (
      <div
        key={item._id}
        className="border border-base-300 rounded-2xl p-4 m-4 shadow-xl bg-base-200 hover:bg-base-300 transition-all w-1/2 mx-auto"
      >
        <div className="flex items-center gap-4">
          {/* Left - Profile Image */}
          <img
            src={item.profileImg}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
          />

          {/* Right - Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold">
              {item.firstName} {item.lastName}
            </h2>

            <p className="text-sm opacity-70">
              {item.gender ?? "Not specified"}
            </p>

            {item.about && (
              <p className="text-sm mt-1 text-base-content/80">
                {item.about}
              </p>
            )}

            {/* Skills Badges */}
            {item.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {item.skills.map((skill, i) => (
                  <div key={i} className="badge badge-primary badge-outline">
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No connections yet.</p>
  )}
</>

    )
}

export default Connections;