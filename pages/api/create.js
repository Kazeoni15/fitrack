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

    const name = req.body.name;
    const weekPlan = req.body.weekPlan;
    const mon = req.body.weekPlan[0];
    const tue = req.body.weekPlan[1];
    const wed = req.body.weekPlan[2];
    const thu = req.body.weekPlan[3];
    const fri = req.body.weekPlan[4];
    const sat = req.body.weekPlan[5];
    const sun = req.body.weekPlan[6];

    jwt.verify(cookie[1], process.env.secret_key,  (err, decoded) => {
      if (err) {
        let error = {
          name: err.name,
          message: err.message,
        };
        res.json(error);
      }
      if (!err) {
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
