const express = require('express');
const connectDb = require('./src/config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routes/auth');
const profileRouter = require('./src/routes/profile');
const requestRouter = require('./src/routes/requests');
const userRouter = require('./src/routes/user');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "*",
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE','OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}))




app.use(express.json())
app.use(cookieParser())

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)


connectDb().then(()=>{
  console.log('Database connected sucessfully.')
app.listen(3000, () => {
  console.log('Server is running on port 3000');    
});
}).catch((err)=>{
    console.log(err)
})



