const jwt = require("jsonwebtoken");
require("dotenv").config();

// verifies if the user is authenticated or not
const verify = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRETE_TOKEN, (err, decodedToken) => {
      if (err) res.json(err.message);
      // res.status(200).send("you are  authenticated");
      req.user = decodedToken;
      next();
    });
  } else {
    // res.redirect("/login");

    res.status(401).send("you are not authenticated");
  }
};

module.exports = verify;

// const authHeader = req.headers.authorization;
// //   console.log(authHeader);
// if (authHeader) {
//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.SECRETE_TOKEN, (error, result) => {
//     if (error) res.status(403).json("token is not valid");
//     req.user = result;
//     //   console.log(result);
//     next();
//   });
// } else {
//   res.status(401).send("you are not authenticated");
// }
