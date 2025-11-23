const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
    minlength:3,
    maxlength:20,
    trim:true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email"+value)
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
    trim: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Invalid password"+value)
      }
    }
  },
  age: {
    type: Number,
    min:18,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Other"
  },
  skills: {
    type: [String],
  },
  about:{
    type:String,
    default:"This is about me section."
  },
  profileImg:{
    type:String,
    default:"https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png"
  }
},
{ timestamps: true }
);

userSchema.methods.getJWT = async function(){
  const user = this;

  const token = await jwt.sign({_id: user._id},'Pawan@Dev',{expiresIn:'1d'})

  return token;
}

userSchema.methods.validatePasswrd= async function name(passwrdByuser) {
  const user=this;
  const passHash = user.password;

  const isPasswrdValid=await bcrypt.compare(passwrdByuser,passHash)
  return isPasswrdValid
}

const User = mongoose.model("User", userSchema);//for remote 
// const User = mongoose.model("User", userSchema);//for local

module.exports = User;
