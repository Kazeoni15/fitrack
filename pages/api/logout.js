import cookie from "cookie";



export default function handler (req, res) {
  

  const serialised = cookie.serialize("jwt", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      maxAge: -1,
      path: "/",
      
      
    });

   res.setHeader("Set-Cookie", serialised);
   res.status(200).json({ message: "Successfuly logged out!" });
  
}