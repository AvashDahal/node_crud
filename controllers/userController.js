const asyncHandler =require('express-async-handler');
const bcrypt = require("bcrypt");
const User =require("../models/userModel");
const session = require('express-session');

const registerUser =asyncHandler(async(req,res)=>{
    const {username,email,password,confirmPassword}= req.body;
    
    if(!username.trim()|| !email|| !password || !confirmPassword)
    {
        
       return res.status(400).json({error:"All fields are mandatory"});
    }
    if(password!=confirmPassword)
    {
        return res.status(400).json({error:"Password does not match"});
    }
    const userAvailable= await User.findOne({email});
    if(userAvailable)
    {
        return res.status(400).json("Ay the user is already registered");
        
    }

    //We need to hash password
    const hashedPassword= await bcrypt.hash(password,10);
    console.log("Hashed Passhword: ",hashedPassword);
    try {
        const user = await User.create({
          username,
          email,
          password: hashedPassword
        });
      
        console.log(`User created ${user}`);
        return res.status(201).json({ _id: user._id, email: user.email });
      
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(400).json({ error: 'User data were not valid' });
      }
      
}); 
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    req.session.userId = user._id; // Store user ID in the session upon successful login
    res.json({ message: 'User logged in successfully' });
  });


  const currentUser = asyncHandler(async (req, res) => {
    const userId = req.session.userId;
  
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
  
    // Fetch the current user information using the stored userId
    const currentUserData = await User.findById(userId);
  
    if (!currentUserData) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.json({ user: currentUserData });
  });




module.exports = {registerUser,loginUser,currentUser}