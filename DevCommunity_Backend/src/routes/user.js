const express = require("express");
const userAuth = require("../middlewares/userAuth");
const ConnetionRequest = require("../modules/connectionReq");
const userRouter = express.Router();
const User = require("../modules/user");

const USER_SAFE_DATA = ["firstName", "lastName", "age", "gender", "skills", "about", "profileImg"];

userRouter.get("/users/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnetionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    res.json({
      message: "Data fetched Successfully.",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});

userRouter.get("/users/connections", userAuth, async (req, res) => {
  try {
     const loggedInUser = req.user;
    const connectionRequests = await ConnetionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA) 
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId; 
      }
      return row.fromUserId; 
    });
    res.json({ data });
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

userRouter.get('/feed',userAuth,async(req,res)=>{
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) ||1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page -1)*limit;
    const connectionRequests= await ConnetionRequest.find({
      $or:[{ fromUserId:loggedInUser._id},
        {toUserId:loggedInUser._id}
      ]
    }).select('fromUserId toUserId')

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req)=>{
      hideUsersFromFeed.add(req.fromUserId.toString())
      hideUsersFromFeed.add(req.toUserId.toString())
    })

    const users= await User.find({
      $and:[
        {_id:{$nin:Array.from(hideUsersFromFeed)}},
      {_id:{$ne:loggedInUser._id}}
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)
    res.send(users)

  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

// Get single user by id (safe fields)
userRouter.get('/users/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(USER_SAFE_DATA);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
