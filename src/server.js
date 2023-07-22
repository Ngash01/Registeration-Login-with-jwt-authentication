import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser"; 

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res)=>{
  res.send("jwt init")
})

app.use('/user',userRoutes )



mongoose.connect("mongodb+srv://kimaniamos82:nganga2001@cluster0.1wwhz68.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log("connection with db established successfully!");
  app.listen(5000, console.log("server running on port: https://localhost:5000"))
}).catch((err)=>{
  console.log(err)
});