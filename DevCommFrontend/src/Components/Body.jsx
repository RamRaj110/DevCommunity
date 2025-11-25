import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useNavigate, useLocation } from 'react-router' // Import useLocation
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUserInfo } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation() // Get current path
  const userData = useSelector((state) => state.userInfo.userInfo)

  const fetchUser = async () => {
    if (userData) return;
    
    try {
     const res = await axios.get(BASE_URL+'profile/view',
      {withCredentials:true})
      dispatch(addUserInfo(res.data))
    } catch (error) {
      // ONLY redirect if the user is NOT on the Login or Home page
      if (error.response && error.response.status === 401) {
         // Check if we are on the landing page ("/")
         if(location.pathname === "/" || location.pathname === "/login") {
             // Do nothing, let them see the Hero page or Login page
             return;
         }
         // Otherwise, kick them to login
         navigate('/login');
      }
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []); // You might want to add [location.pathname] here if you want to re-check on route change

  return (
    <div className="flex flex-col min-h-screen text-white"> {/* Added text-white for dark mode vibe */}
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Body