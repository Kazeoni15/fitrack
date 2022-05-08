// route to request user data

import dbConnect from "../../utils/dbConnect";
import User from "../../models/user"
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
//  connect to database
  await dbConnect();

  if (method === "POST") {
    // verify the cookies
 
    jwt.verify(req.headers.token, process.env.secret_key, (err, decoded)=>{
      // handle errors
      if(err) {
        let error = {
          name: err.name,
          message:err.message
        }
        
        res.json(error)
        
        
      }
      if(!err){

        // if no errors find the find the user 
        User.findOne({ userID: decoded.user }, (err, doc) => {

          // if there is no user auth fails
          if(!doc || err) res.json("auth failed")

          // if user is found respond with the user data
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
