import dbConnect from "../../utils/dbConnect";
import Plan from "../../models/plan"
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    
 
    jwt.verify(req.headers.token, process.env.secret_key, (err, decoded)=>{
      if(err) {
        let error = {
          name: err.name,
          message:err.message
        }
        
        res.json(error)
        
        
      }
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
