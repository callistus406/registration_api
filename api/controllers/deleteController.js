const deleteController = (req, res) => {
  const deleteUserQuery = deleteUser(req.body.email);
  if (req.user.id === req.params.user_id && req.user.role === "admin") {
    // res.json({ msg: "you are an admin" });
    db.then((client) => {
      client
        .query(deleteUserQuery)
        .then((result) => {
          if (result.rowCount < 1)
            return res
              .status(401)
              .json({ msg: "no user with the provided  email" });
          res.status(200).json({ msg: "user has been deleted" });
        })
        .catch((err) => {
          res.status(400).json({ msg: err.message });
        });
    }).catch((err) =>
      res.status(500).json({ msg: "database connectivity error" })
    );
  } else {
    res.status(401).json({ msg: "sorry!, only admin can delete users" });
  }
  // res.json({ paramsId: req.params.user_id, roles: req.user });
};

module.exports = deleteController;
