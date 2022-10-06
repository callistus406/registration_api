const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const routes = require("./api");
const nodemailer = require("nodemailer");
// global variables

const port = process.env.EXPRESS_PORT || 3000;

// middleWares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

// listen to actions

// step 1
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karlkahlid@gmail.com",
    pass: "callyboss74691#",
  },
});

// step 2
let mailOptions = {
  from: "karlkahlid@gmail.com",
  to: "callistus506@gmail.com",
  subject: " testing testing",
  text: "it works",
};

// step3
transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log("Error Occurred");
  } else {
    console.log("email sent");
  }
});
app.listen(port, () => console.log(`app is running on ${port}`));
