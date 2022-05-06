function query(data) {
  return {
    name: "fetch-username",
    text: "SELECT * FROM users_table WHERE username= $1  ",
    values: [data],
  };
}

function insertUser(username, email, password) {
  return {
    name: "insert-user",
    text: "INSERT INTO users_table (id,username,email,password) VALUES($1,$2,$3,$4) ",
    values: [Date.now(), username, email, password],
  };
}

function getUserName(username) {
  return {
    name: "fetch-user",
    text: "SELECT * FROM users_table WHERE username= $1 ",
    values: [username],
  };
}
function deleteUser(email) {
  return {
    name: "insert-user",
    text: "DELETE FROM users_table WHERE email =$1",
    values: [email],
  };
}
// const sqlQuery = {
//     name: "insert-user",
//     text: "DELETE FROM users_table WHERE email =$1",
//     values: [req.body.email],
//   };

module.exports = {
  query,
  insertUser,
  getUserName,
  deleteUser,
};
