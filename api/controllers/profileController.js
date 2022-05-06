const verify = require("../../auth/verify");
const { db } = require("../../dbConnection/connection");

const profileController = (req, res) => {
  const sqlQuery = {
    name: "get-user",
    text: "SELECT * FROM users_table WHERE id = $1",
    values: [req.user.id],
  };
  //   connect to Db

  db.then((client) => {
    //   query the db
    client
      .query(sqlQuery)
      .then((result) => {
        //   display the results if found
        if (result.length < 1) return res.json({ msg: "no information found" });
        //send users profile info
        res.status(200).json({
          id: result.rows[0].id,
          username: result.rows[0].username,
          email: result.rows[0].email,
          role: result.rows[0].roles,
        });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  }).catch((err) =>
    res.status(500).json({ msg: "database connectivity error" })
  );
};
module.exports = profileController;
