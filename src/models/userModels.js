import mongoose from "mongoose";

const UserModel = mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    unique:true
  },
  profilePic:{
    type:String,
    default:""
  }
})

const User = mongoose.model("user",UserModel);
export default User;