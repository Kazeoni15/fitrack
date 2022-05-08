// route to enable following a plan

import dbConnect from "../../utils/dbConnect";
import Plan from "../../models/plan";
import User from "../../models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  // dbConnect will connect to the database
  await dbConnect();

  // if the api method is POST
  if (method === "POST") {
    // find out if the user is logged in
    const jsonWeb = req.headers.cookie;

    const cookie = jsonWeb.split("=");

    // verify the cookie
    jwt.verify(cookie[1], process.env.secret_key, (err, decoded) => {
      if (err) {
        let error = {
          name: err.name,
          message: err.message,
        };
        res.json(error);
      }
      if (!err) {
        // find the plan
        Plan.find({ _id: req.body.id }, function (err, doc) {
          if (!err && doc) {
            // set the plan
            User.findOneAndUpdate(
              { userID: decoded.user },
              { following: { plan: doc[0] } },
              { upsert: true },
              function (err, doc) {
                res.send("plan set");
              }
            );
          }
        });
      }
    });
  }
}
