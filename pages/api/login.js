import dbConnect from "../../utils/dbConnect";
import bcrypt from "bcrypt";
import User from "../../models/user";
import { sign } from "jsonwebtoken";
import cookie from "cookie"



export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    User.findOne({ userID: req.body.username }, async (err, doc) => {
      if(!doc){
        res.status(200).send("auth failed")
      }
      if (!err && doc) {
        bcrypt.compare(req.body.password, doc.password, function (err, result) {
          
          if (!err && result) {
            const payload = { user: doc.userID };
            const jwt = sign(payload, process.env.secret_key, {
              expiresIn: "12h",
            });

            res.setHeader("Set-Cookie", cookie.serialize("jwt", jwt, {httpOnly:true, secure: process.env.NODE_ENV !== "development", sameSite: "strict", path:"/"}))
             res.status(200).send("Success")
            
             
          }

          if(!result){
            
            res.status(200).send("auth failed")
          }
        });
      }

      if(err){
        res.send(err)
      }
    });
  }
}
