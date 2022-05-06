const express = require("express");
require("dotenv").config();
const router = express.Router();
const { db } = require("../../dbConnection/connection");
const { decodePassword } = require("../../auth/password");
const { loginValidation } = require("../../auth/validation");
const { query } = require("../../queries/queries");
const jwt = require("jsonwebtoken");

const loginController = (req, res) => {
  // connect.
  const createQuery = query(req.body.username);
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.message);
  db.then((client) => {
    client
      .query(createQuery)
      .then((user) => {
        decodePassword(req.body.password, user.rows[0].password).then(
          (result) => {
            // console.log(user.rows);
            if (!result)
              return res.json({ msg: "incorrect username or password" });
            // create access token
            const accessToken = jwt.sign(
              {
                id: user.rows[0].id,
                username: user.rows[0].username,
                role: user.rows[0].roles,
              },
              process.env.SECRETE_TOKEN,
              { expiresIn: "5m" }
            );
            // send jwt access token in cookie

            res.cookie("jwt", accessToken, {
              httpOnly: true,
              // cookie will expire in 5 mins
              maxAge: 5 * 60000,
            });
            // send payload if success
            res.status(200).json({
              id: user.rows[0].id,
              username: user.rows[0].username,
              role: user.rows[0].roles,
            });

            // { message: "congratulations you have logged in" }
            // generate token

            // res.json(result);
          }
        );
      })
      .catch((error) =>
        res.status(400).json({ msg: "username or password is incorrect" })
      );
  }).catch((err) =>
    res.status(500).json({ message: "database connectivity error" })
  );
};

module.exports = loginController;
