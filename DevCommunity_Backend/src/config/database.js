const mongoose = require('mongoose');


const connectDb= async ()=>{
await mongoose.connect(process.env.DATA_BASE_URL);
    
}
   
module.exports = connectDb;