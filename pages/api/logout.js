import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;

  if (method == "GET") {
    // res.setHeader(
    //   "Set-Cookie",
    //   cookie.serialize("jwt", "", {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== "development",
    //     expires: new Date(0),
    //     sameSite: "strict",
    //     path: "/",
    //   })
    // );
   await res.cookie("jwt", "", { expires: new Date(0)})
   await res.status(200).send("logged out");
  }
}
