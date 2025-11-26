const jwt = require('jsonwebtoken')
const User = require('../modules/user')

const userAuth = async(req, res,next)=>{
   
  try{  const cookies = req.cookies
    const {token} = cookies;
    if(!token){
       return  res.status(401).send('Unauthorized: Please login first...')
       
    }
        let decodedObj;
        try{
            decodedObj = await jwt.verify(token,'Pawan@Dev')
        }catch(verifyErr){
            return res.status(401).send('Unauthorized: Invalid or expired token')
        }

        const {_id}=decodedObj
        const user = await User.findById(_id);
        console.log('userAuth - user lookup result:', !!user, user?._id)
        if(!user){
                return res.status(401).send('Unauthorized: user not found')
        }
        req.user = user
        next();

}catch(err){
        res.status(400).send('ERROR: '+ err.message)
    }
}

module.exports = userAuth