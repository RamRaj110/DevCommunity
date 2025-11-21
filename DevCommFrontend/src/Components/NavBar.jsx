import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { removeUserInfo } from '../utils/userSlice'

const NavBar = () => {
  const user = useSelector((state)=>state.userInfo.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout=async()=>{
    try {
      await axios.post(BASE_URL+'logout',{},{
        withCredentials:true,
      })
      dispatch(removeUserInfo())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to='/feed' className="btn btn-ghost text-xl">DevCommunity</Link>
  </div>
  <div className="flex gap-2">
  {!user && <Link to='/login'>
    <button className="btn btn-outline btn-success mr-2">Login</button>  
    </Link>}
    {user && <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-2">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.profileImg || 'https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png'}/>
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <p className='pl-2'>Welcome, {user.firstName}</p>
        <li>
          <Link to='/profile'  className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          <Link to='/connections'>  Connections
          </Link>
          </li>
           <li>
          <Link to='/requests'>  Requests
          </Link>
          </li>
        <li>
          <a
        onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
    </div>
  )
}

export default NavBar
