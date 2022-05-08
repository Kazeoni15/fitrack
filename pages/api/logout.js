//Logout route  

import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;
  
// if the api method is GET send an empty cookie that is expired
  if (method == "GET") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
       
        expires: new Date(0),
        
        path: "/",
      })
    );
    res.status(200).send("logged out");
  }
}
