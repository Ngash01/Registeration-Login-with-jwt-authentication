import jwt from "jsonwebtoken";
// 2 functions... create a token, middleware - verify

const createTokens = (user)=>{
  const accessToken = jwt.sign({name: user.name, id:user._id}, 
    process.env.SECRET_KEY);
    return accessToken;
}

// middleware
export const validateToken = (req, res, next)=>{
  const accessToken = req.cookies['access-token'];
  if(!accessToken){
    res.status(401).send("User not authenticated!");
  }
  try{
    const validToken = jwt.verify(accessToken, process.env.SECRET_KEY);
    if(validToken){
      req.authenticated = true;
      next();
    }
  }
  catch(err){
    res.status(400).send(err)
    console.log(err);
  }
}

export default createTokens


// export const validateToken = (req, res, next)=>{
//   const accessToken = req.cookies["access-token"]

//   if(!accessToken){
//     res.status(401).send("Error! user not authenticated")
//   }

//   try{
//     const validToken = jwt.verify(accessToken, process.env.SECRET_KEY);
//     if(validToken){
//       req.authenticated = true;
//       return next();
//     }
//   }
//   catch(err){
//     res.status(400).send(err)
//   }
// }