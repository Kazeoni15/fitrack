import cookie from "cookie";



export default async function handler (req, res) {
  

  const jwt = req.headers.token;

  if (!jwt) {
    return res.json({ message: "Already logged out" });
  } else {
    const serialised = cookie.serialize("jwt", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Successfuly logged out!" });
  }
}