const express = require('express');
const userAuth =require('../middlewares/userAuth')
const profileRouter = express.Router()
const {userValidationProfile} = require('../utils/userValidation')
const bcrypt = require('bcrypt')


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
  try{
    const user = req.user
    res.send(user)
  }catch(err){
    res.status(400).send('Error'+err.message);
  }
})
profileRouter.put("/profile/edit",userAuth,async(req,res)=>{
    try {
        if(!userValidationProfile(req)){
            throw new Error("Invalid Edit Request.")
        }
        const user = req.user
        Object.keys(req.body).forEach((key)=>{
            user[key] = req.body[key]
        })
        await user.save();
        res.send({
  message: user.firstName + " Profile updated successfully...",
  user,
});

    } catch (err) {
        res.status(400).send('Error '+err.message);
    }
})

profileRouter.patch('/profile/forgot-password',userAuth,async(req,res)=>{
    try{
        const {oldPassword,newPassword} = req.body
        if(!oldPassword || !newPassword){
            throw new Error("Error : old password and new password is required " )
        }
        const user = req.user
        if(!user){
            throw new Error('user not found')
        }

        const match = await bcrypt.compare(oldPassword,user.password)
        if(!match){
            throw new Error('old password is not correct')
        }

        const hashPassword = await bcrypt.hash(newPassword,10)
        user.password = hashPassword
        await user.save()
        res.send('Password updated successfully...')

    }catch(err){
        res.status(400).send('Error '+err.message)
    }
})



module.exports = profileRouter;

