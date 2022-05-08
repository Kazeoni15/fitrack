// create route for creating plans

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
    // cookie sent from the frontend
    const jsonWeb = req.headers.cookie;

    // formating the cookie 
    const cookie = jsonWeb.split("=");

    // collecting data from the request
    const name = req.body.name;
    const weekPlan = req.body.weekPlan;
    const mon = req.body.weekPlan[0];
    const tue = req.body.weekPlan[1];
    const wed = req.body.weekPlan[2];
    const thu = req.body.weekPlan[3];
    const fri = req.body.weekPlan[4];
    const sat = req.body.weekPlan[5];
    const sun = req.body.weekPlan[6];

    // verify the cookie 
    jwt.verify(cookie[1], process.env.secret_key,  (err, decoded) => {
      // error handling
      if (err) {
        let error = {
          name: err.name,
          message: err.message,
        };
        res.json(error);
      }
      // if no error
      if (!err) {
        // create a plan in the database and set it as the one user is following
        const createdplan = {
          Title: name,
          Mon: mon,
          Tue: tue,
          Wed: wed,
          Thu: thu,
          Fri: fri,
          Sat: sat,
          Sun: sun,
          createdBy: decoded.user,
        };

       User.findOneAndUpdate({userID: decoded.user}, {following:{plan:createdplan}}, {upsert: true}, function(err, doc) {
          
        });

        const plan = new Plan({
          Title: name,
          Mon: mon,
          Tue: tue,
          Wed: wed,
          Thu: thu,
          Fri: fri,
          Sat: sat,
          Sun: sun,
          createdBy: decoded.user,
        });

        plan.save();
        res.send("Plan Created");
      }
    });
  }
}
