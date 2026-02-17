const socketIO = require("socket.io");
const crypto = require("crypto");
const Chat = require("../modules/chat");
const path = require("path");

const secreteRoomId = (userId, targetUserId) => {
  const hash = crypto.createHash("sha256");
  const combinedIds = [userId, targetUserId].sort().join("_");
  hash.update(combinedIds);
  return hash.digest("hex");
};

const initializeSocket = (server) => {
  // const FRONTEND_URL = "https://effective-space-guide-49vvxpj7pv7hw4v-5173.app.github.dev";
  const io = socketIO(server, {
    // path: '/api/socket.io',
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://3.106.130.58",
        "https://dev-community-seven.vercel.app",
      ],
      // origin: FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = secreteRoomId(userId, targetUserId);
      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      async ({ userId, targetUserId, firstName, text: newMessage }) => {
        try {
          const roomId = secreteRoomId(userId, targetUserId);
          const messageData = {
            firstName,
            userId,
            text: newMessage,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            sender: userId,
            text: newMessage,
          });
          await chat.save();
          io.to(roomId).emit("receiveMessage", messageData);
        } catch (error) {
          console.error("Error in sendMessage:", error);
        }
      },
    );
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};
module.exports = initializeSocket;
