const socketIO = require('socket.io');

const initializeSocket = (server) => {
    const FRONTEND_URL = "https://effective-space-guide-49vvxpj7pv7hw4v-5173.app.github.dev";
    const io = socketIO(server, {
        cors: {
            // origin: ["http://localhost:3000", "http://localhost:5173",],
            origin: FRONTEND_URL,
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    io.on('connection', (socket) => {

        socket.on('joinChat', ({userId, targetUserId ,firstName}) => {
            const roomId = [userId, targetUserId].sort().join('_');
            console.log(`User ${userId} joined room: ${roomId}`);
            console.log(firstName, "Joind in ", roomId);
            socket.join(roomId);
        });
        socket.on('sendMessage', ( {userId, targetUserId ,firstName,text: newMessage,}) => {
            const roomId = [userId, targetUserId].sort().join('_');
            const messageData = {
                firstName,
                userId,
                text: newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            console.log(`Message from ${userId} to room ${roomId}: ${newMessage}`);
            io.to(roomId).emit('receiveMessage', messageData);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
}   
module.exports = initializeSocket;