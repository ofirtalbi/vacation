const dal = require("../dal/dal");

async function addUser(user) {
  //check username
  const checkUserName = `SELECT * from users WHERE username = '${user.username}'`;
  const userNameResult = await dal.executeAsync(checkUserName);
  if (userNameResult.length != 0) {
    return 0;
  }
  // check for full form
  if (
    user.firstName === undefined ||
    user.lastName === undefined ||
    user.username === undefined ||
    user.userPass === undefined
  ) {
    return 1;
  }
  const sql = `INSERT INTO users(firstName ,lastName ,username, userPass , isAdmin)
    VALUES ('${user.firstName}','${user.lastName}','${user.username}','${user.userPass}', false)`;
  const info = await dal.executeAsync(sql);
  user.userId = info.insertId;
  user.isAdmin = false;
  return user;
}

module.exports = {
  addUser,
};
