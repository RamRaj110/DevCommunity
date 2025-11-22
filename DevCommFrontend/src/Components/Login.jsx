import {  useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const  navigate  = useNavigate();


  const dispatch = useDispatch()
  const handleSubmit =async (e) => {
    e.preventDefault();
   try {
    setError("")
    const res = await axios.post(BASE_URL+'login',{
      email,
      password
    },{
      withCredentials:true,
    })
    dispatch(addUserInfo(res.data.user))
    navigate('/feed')
   } catch (error) {
      setError(error.response.data || "Something went wrong" )
  }
  }

  const handleSignUp = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL+'signup',{
        firstName,
        lastName,
        email,
        password
      },{
        withCredentials:true,
      })
      dispatch(addUserInfo(res.data.user))
      navigate('/edit')
    } catch (error) {
     setError(error.response?.data || "Something went wrong");
    }
  }

 

  return (
    <>
    <div className="">
      <div className=" flex min-h-full flex-col justify-center px-6 py-10 lg:px-4 border border-gray-700 rounded-md bg-gray-800 max-w-md mx-auto  m-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-white">{isSignUp ? " SignUp": "Login " }</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-[70%] sm:max-w-sm">
          <form onSubmit={isSignUp ? handleSignUp : handleSubmit}method="POST" className="space-y-6">
            {isSignUp &&<>
             <div>
              <label htmlFor="firstName"
               className="block text-sm/6 font-medium text-gray-100">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
                  required
                  
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="lastName " className="block text-sm/6 font-medium text-gray-100">
                  Last Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                  required
                 
                  className="block w-full rounded-md bg-white/5 px-3 py-1 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div></>}
             <div>
              <label htmlFor="email"
               className="block text-sm/6 font-medium text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
            <p className="text-red-500 text-sm pb-2">{error} </p>
              <button
               
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {isSignUp ? " SignUp": "Login " }
              </button>
              <div className="mt-4 text-sm text-gray-300">
                {isSignUp ? "Already have an account? ": "Don't have an account? "}
                <button
                  type="button"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Login" : "SignUp"}
                </button>
                </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}
