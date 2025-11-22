import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const navigate = useNavigate();
  // console.log(feed)

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
  getFeed();
  }, [])
  
 if (!feed) return;
 if( feed.length === 0){
  return <h1 className="text-2xl text-center p-2 font-bold">No Feeds Available</h1>
 }

  return (
    feed && (
      <div>
      
    <UserCard  user={feed[0]}/>
       
    
      
      </div>
    )
  );
};

export default Feed;
