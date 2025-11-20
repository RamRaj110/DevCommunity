const validate = require("validator");

const userValidation = (req)=>{
const {firstName,lastName,email,password} = req.body
if(!firstName || !lastName ){
    throw new Error("first name and last name is required");
}else if(!validate.isStrongPassword(password)){
    throw new Error("password is not strong");
}else if(!validate.isEmail(email)){
    throw new Error("email is not valid");
}
}

const userValidationProfile= (req)=>{
    const allowedEdit = ['firstName','lastName','gender','skills','about','profileImg',"age"]
    const isEditAllowed = Object.keys(req.body).every((key)=> allowedEdit.includes(key))
    return isEditAllowed
}


module.exports = {userValidation,userValidationProfile}