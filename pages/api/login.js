// login route for auth

import dbConnect from "../../utils/dbConnect";
import bcrypt from "bcrypt";
import User from "../../models/user";
import { sign } from "jsonwebtoken";
import cookie from "cookie"



export default async function handler(req, res) {
  const { method } = req;

  // dbConnect will connect to the database
  await dbConnect();

  // if the api method is POST
  if (method === "POST") {
    // find the user in the database
    User.findOne({ userID: req.body.username }, async (err, doc) => {
    //  handle faliure
      if(!doc){

        res.status(200).send("auth failed")
      }
      // if no error and the user is found
      if (!err && doc) {
        // compare the passwords
        bcrypt.compare(req.body.password, doc.password, function (err, result) {
          
          if (!err && result) {
            const payload = { user: doc.userID };
            const jwt = sign(payload, process.env.secret_key, {
              expiresIn: "12h",
            });

            // send a cookie to the frontend
            res.setHeader("Set-Cookie", cookie.serialize("jwt", jwt, {httpOnly:true, secure: process.env.NODE_ENV !== "development", sameSite: "strict", path:"/"}))
             res.status(200).send("Success")
            
             
          }

          // if the password is wrong send message
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
