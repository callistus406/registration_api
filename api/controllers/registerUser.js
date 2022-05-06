const { db } = require("../../dbConnection/connection");
const { hashedPassword } = require("../../auth/password");
const { registerValidation } = require("../../auth/validation");
const { insertUser, getUserName } = require("../../queries/queries");
const registerUser = (req, res) => {
  const userInsertQuery = insertUser(
    req.body.username,
    req.body.email,
    req.body.password
  );
  const getUserNameQuery = getUserName(req.body.username);
  // end of sql queries
  // validates the request body
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.message);
  // db connection
  db.then((client) => {
    // db query
    client
      .query(getUserNameQuery)
      .then((result) => {
        if (result.rows.length > 0) {
          res.status(208).json({ message: "user already exist" });
        } else {
          // hash received password and store it
          hashedPassword(userInsertQuery.values[3])
            .then((secretPassword) => {
              userInsertQuery.values[3] = secretPassword;
              db.then((client) => {
                client
                  .query(userInsertQuery)
                  .then((result) =>
                    res.status(200).json({ msg: "thank you for registering " })
                  )
                  .catch((error) => res.status(400).json(error.message));
              }).catch((error) =>
                res.status(500).json({ msg: "database connectivity error" })
              );
            })
            .catch((error) =>
              res.status(500).json({
                msg: "an error ocurred while encrypting your password",
              })
            );
        }
      })
      .catch((error) => res.status(400).json({ error: error.message }));
  }).catch((error) =>
    res.status(500).json({ msg: "database connectivity error" })
  );
};

module.exports = registerUser;
