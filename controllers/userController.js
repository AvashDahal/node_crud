const asyncHandler =require('express-async-handler');
const bcrypt = require("bcrypt");
const User =require("../models/userModel");

const registerUser =asyncHandler(async(req,res)=>{
    const {username,email,password}= req.body;
    
    if(!username.trim()|| !email|| !password)
    {
        
        res.status(400).json({error:"All fields are mandatory"});
    }
    const userAvailable= await User.findOne({email});
    if(userAvailable)
    {
        res.status(400).json("Ay the user is already registered");
        
    }

    //We need to hash password
    const hashedPassword= await bcrypt.hash(password,10);
    console.log("Hashed Passhword: ",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`User created ${user}`)
    if(user)
    {
        res.status(201).json({user_id: user.id, email: user.email });
    }
    else
    {
        res.status(400).json("User data were not valid");
    }
    
}); 
const loginUser =asyncHandler((req,res)=>{
    res.json({message : "Login the user"});
});

const currentUser =asyncHandler(async(req,res)=>{
    res.json({message : "Register the user"});
}); 




module.exports = {registerUser,loginUser,currentUser}