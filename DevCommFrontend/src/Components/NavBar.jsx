import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { removeUserInfo } from '../utils/userSlice'

const NavBar = () => {
  const user = useSelector((state) => state.userInfo.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + 'logout', {}, {
        withCredentials: true,
      })
      dispatch(removeUserInfo())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="navbar bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-lg px-4 sm:px-8 h-16">
        
        {/* --- Logo Section --- */}
        <div className="flex-1">
          <Link to={user ? '/feed' : '/'} className="  normal-case gap-3 pl-0">
            <img 
              className='w-18 h-18 rounded-lg object-cover ' 
              src="../src/Img/codepairImgcopy.png" 
              alt="logo" 
              onError={(e) => {e.target.style.display='none'}} 
            />
          </Link>
        </div>

        {/* --- Right Side Actions --- */}
        <div className="flex gap-4 items-center">
          
          {/* NOT Logged In */}
          {!user && (
            <Link to='/login'>
               <button className="btn border-none bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 px-6 shadow-md shadow-purple-500/20 transition-all duration-200">
                Login
              </button> 
            </Link>
          )}

          {/* Logged In (User Menu) */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-slate-700 hover:border-blue-500 transition-all duration-200">
                <div className="w-10 rounded-full ring ring-offset-2 ring-offset-slate-950 ring-slate-800">
                  <img
                    alt="User Profile"
                    src={user.profileImg || 'https://geographyandyou.com/images/user-profile.png'}
                  />
                </div>
              </div>
              
              {/* Dropdown Content */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-900 border border-slate-800 rounded-xl z-[1] mt-4 w-56 p-2 shadow-2xl text-slate-300">
                
                <li className="menu-title text-slate-500 px-4 py-2 border-b border-slate-800 mb-2">
                   Welcome, <span className="text-blue-400 font-semibold truncate">{user.firstName}</span>
                </li>
                
                <li>
                  <Link to='/profile' className="hover:bg-slate-800 hover:text-white py-2 rounded-lg flex justify-between items-center">
                    <span>Profile</span>
                    <span className="text-xs">👤</span>
                  </Link>
                </li>
                <li>
                  <Link to='/connections' className="hover:bg-slate-800 hover:text-white py-2 rounded-lg flex justify-between items-center"> 
                    <span>Connections</span>
                    <span className="text-xs">🤝</span>
                  </Link>
                </li>
                <li>
                  <Link to='/requests' className="hover:bg-slate-800 hover:text-white py-2 rounded-lg flex justify-between items-center">
                     <span>Requests</span>
                     <span className="text-xs">📩</span>
                  </Link>
                </li>
                
                <div className="divider my-1 before:bg-slate-800 after:bg-slate-800"></div>
                
                <li>
                  <a onClick={handleLogout} className="text-red-400 hover:bg-red-900/20 hover:text-red-300 py-2 rounded-lg font-medium cursor-pointer flex justify-between items-center">
                    <span>Logout</span>
                    <span className="text-xs">🚪</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar