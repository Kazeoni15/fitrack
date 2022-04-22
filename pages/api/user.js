import dbConnect from "../../utils/dbConnect";
import User from "../../models/user"
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    
 
    jwt.verify(req.headers.token, process.env.secret_key, (err, decoded)=>{
      if(err) {
        let error = {
          name: err.name,
          message:err.message
        }
        
        res.json(error)
        
        
      }
      if(!err){
        User.findOne({ userID: decoded.user }, (err, doc) => {
          if(!doc || err) res.json("auth failed")
          if (!err && doc) {
          
            let payload = {
              userID: doc.userID,
              liked: doc.liked,
              following: doc.following
             
            };
    
            
            res.status(200).json(payload);
          } 
         
        })
      }
    });

    
  }
}
