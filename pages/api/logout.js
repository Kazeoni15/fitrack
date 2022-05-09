import cookie from "cookie";



export default async function handler (req, res) {
  

  const serialised = cookie.serialize("jwt", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

  await  res.writeHead("Set-Cookie", serialised);
  await  res.status(200).json({ message: "Successfuly logged out!" });
  
}