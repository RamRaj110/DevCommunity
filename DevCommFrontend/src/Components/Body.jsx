import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Navigate, Outlet } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUserInfo } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userInfo.userInfo)
  

  const fetchUser = async () => {
    if (userData) return;

    try {
     const res = await axios.get(BASE_URL+'profile/view',
      {withCredentials:true})
      dispatch(addUserInfo(res.data))
    } catch (error) {
      console.log("fetch user error"+error)}
  }

  useEffect(() => {
    fetchUser();
  }, []); 
  return (
    <div className="flex flex-col min-h-screen text-white"> 
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Body
