// route for all plans

import dbConnect from "../../utils/dbConnect";
import Plan from "../../models/plan"
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
   // dbConnect will connect to the database
  await dbConnect();

  // if the api method is GET
  if (method === "GET") {
    
//  first verify that the user is logged in
    jwt.verify(req.headers.token, process.env.secret_key, (err, decoded)=>{
    //  Handle error
      if(err) {
        let error = {
          name: err.name,
          message:err.message
        }
        
        res.json(error)
        
        
      } 
      // find all plans and send them all send them as resonse
      if(!err){
        Plan.find({ }, (err, docs) => {
          
          if (!err && docs) {
          
            let payload = {
              docs: docs
              
             
            };
    
            
            res.status(200).json(payload);
          } 
         
        })
      }
    });

    
  }
}
