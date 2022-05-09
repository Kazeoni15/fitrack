import cookie from "cookie";



export default async function handler(req, res) {
  const { method } = req;


  // if the api method is GET
  if (method == "POST") {
    // send a cookie to the client
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge:-1,
        sameSite: "strict",
        path: "/api",
      })
    );
    res.status(200).send("logged out");
  }
}
