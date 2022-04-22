import dbConnect from "../../utils/dbConnect";
import Plan from "../../models/plan";
import User from "../../models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    const jsonWeb = req.headers.cookie;

    const cookie = jsonWeb.split("=");

    

    jwt.verify(cookie[1], process.env.secret_key,  (err, decoded) => {
      if (err) {
        let error = {
          name: err.name,
          message: err.message,
        };
        res.json(error);
      }
      if (!err) {
        Plan.find({_id: req.body.id}, function(err, doc){
            

            if(!err && doc){
                
              

                User.findOneAndUpdate({userID: decoded.user}, {following:{plan:doc[0]}}, {upsert: true}, function(err, doc) {
                    res.send("plan set")
          
                });

            } 
            

        })

      

      }
    });
  }
}