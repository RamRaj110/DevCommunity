const mongoose = require('mongoose');

const connectDb= async ()=>{
    const connect1 = await mongoose.connect('mongodb://localhost:27017/DevComm');
    // const connect = await mongoose.connect('mongodb+srv://admin123:admin123@firstdb.dtkfapk.mongodb.net/?appName=FirstDb')
}
   
module.exports = connectDb;