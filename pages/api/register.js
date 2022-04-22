import dbConnect from "../../utils/dbConnect";
import bcrypt from "bcrypt";
import User from "../../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    User.findOne({ userID: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User already exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const register = new User({
          userID: req.body.username,
          password: hashedPassword,
          following: {plan: "none"}
        });

        await register.save();

        await res.send("User Created");
      }
    });
  }
}
