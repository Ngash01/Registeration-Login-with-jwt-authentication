import express  from "express";
import User from "../models/userModels.js";
import CryptoJS from "crypto-js";
import 'dotenv/config';
import createTokens, { validateToken } from "../jwt.js";

const router = express.Router();

// Register a user
router.post('/register',async(req, res)=>{
  try{
    const registeredInfo = await User.create({
      name: req.body.name,
      email: req.body.email,
      password:  CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
      profilepic: req.body.profilepic
      
    })
    res.send("user updated successfully in the db")
  }
  catch(err){
    console.log(err)
  }
});

// Login a user

router.post('/login', async(req,res)=>{
  try{
    const user = await User.findOne({
      email: req.body.email
    })
    if(!user){
      res.status(400).send("User does not exist")
    }

    var bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if(originalPassword !== req.body.password){
      res.send("Wrong password") 
    }

    const accessToken = createTokens(User);

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true
    })

    res.status(200).send("User logged in successfully!")

  }
  catch(err){
    res.status(400).send(err)
  }
});

// fetch all users
router.get('/', async(req, res)=>{
  const users = await User.find();
  res.status(200).send(users);
})

// view profile 
// allow a user to get a response if only they are verified
router.get('/profile', validateToken, (req, res)=>{
 res.send("Profile")
})

export default router;