const mysql = require("mysql");

// const connection = mysql.createPool({
//   host: config.mysql.host,
//   user: config.mysql.user,
//   password: config.mysql.password,
//   database: config.mysql.database,
// });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vacation_db",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to DB");
});

function executeAsync(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  executeAsync,
};
