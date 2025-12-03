const express = require('express');
const chatRouter = express.Router();
const userAuth = require('../middlewares/userAuth');
const Chat = require('../modules/chat');

chatRouter.get('/chat/:targetUserId',userAuth, async (req, res) => {
    try {
        const {targetUserId} = req.params;
        const userId = req.user._id;
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] }
        }).populate('messages.sender', 'firstName lastName profileImg');

        if(!chat){
            chat = new Chat({ participants: [userId, targetUserId], messages: [] });
            await chat.save();
        }
        res.status(200).json(chat);

    } catch (error) {
        console.error("Error fetching chat:", error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = chatRouter;