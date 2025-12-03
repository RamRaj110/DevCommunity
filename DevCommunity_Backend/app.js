const express = require('express');
const connectDb = require('./src/config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routes/auth');
const profileRouter = require('./src/routes/profile');
const requestRouter = require('./src/routes/requests');
const userRouter = require('./src/routes/user');
const chatRouter = require('./src/routes/chat');
const initializeSocket = require('./src/utils/socket');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);


// const FRONTEND_URL = "https://effective-space-guide-49vvxpj7pv7hw4v-5173.app.github.dev";

app.use(cors({
   origin: ["http://localhost:3000", "http://localhost:5173", "http://3.106.130.58",],
    // origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cookieParser())

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)
app.use('/',chatRouter)


const server = http.createServer(app);

initializeSocket(server);


connectDb().then(()=>{
  console.log('Database connected sucessfully.')
server.listen( 3000 , () => {
  console.log('Server is running on port 3000');    
});
}).catch((err)=>{
    console.log(err)
})
