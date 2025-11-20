const express = require("express");
const userAuth = require("../middlewares/userAuth");
const ConnetionRequest = require("../modules/connectionReq");
const User = require("../modules/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["intrested", "ignore"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type:" + status });
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      const existingConnectionRequest = await ConnetionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }

      const connectionRequest = new ConnetionRequest({
        fromUserId,
        toUserId,
        status,
      });
      

      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + " is " + status + ", " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("Error something is wrong.", err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed!" });
      }

      const connectionRequest = await ConnetionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "intrested",
      });
      if (!connectionRequest) {
        return res.status(404).json({
          message: "Connection request not found.",
        });
      }
      if (
        loggedInUser._id.toString() !== connectionRequest.toUserId.toString()
      ) {
        return res
          .status(403)
          .json({ message: "You are not authorized to review this request." });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message:"Connection request " + status, data });
    } catch (error) {
      res.status(404).send("Something is worng in approval. " + error.message);
    }
  }
);

module.exports = requestRouter;
