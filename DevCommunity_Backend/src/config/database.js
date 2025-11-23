const mongoose = require('mongoose');

const connectDb= async ()=>{
    // const connect1 = await mongoose.connect('mongodb://localhost:27017/DevComm');
await mongoose.connect('mongodb+srv://CodePair:sN42AalwkJ7s2F7S@firstdb.dtkfapk.mongodb.net/CodePair')
   
    
}
   
module.exports = connectDb;