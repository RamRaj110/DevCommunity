const socketIO = require('socket.io');

const initializeSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: ["http://localhost:3000", "http://localhost:5173",],
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    io.on('connection', (socket) => {
         console.log('New client connected:', socket.id);
        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
        });
       
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
}   
module.exports = initializeSocket;