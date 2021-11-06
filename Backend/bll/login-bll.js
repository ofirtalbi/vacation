const dal = require("../dal/dal");

async function login(user) {
  const sql = `SELECT * from users WHERE username = "${user.username}" and userPass = "${user.userPass}"`;
  const login = await dal.executeAsync(sql);
  if (login.length === 0) {
    return 0;
  }
  return login;
}

module.exports = {
  login,
};
