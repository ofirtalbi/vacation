const dal = require("../dal/dal");

async function getAllVacations() {
  const sql = "SELECT * FROM vacations;";
  const vacations = await dal.executeAsync(sql);
  return vacations;
}

async function getOneVacation(id) {
  const sql = `SELECT * from vacations WHERE vacationId = ${id}`;
  const vacation = await dal.executeAsync(sql);
  return vacation;
}

async function followVacation(data) {
  const sql = `INSERT INTO savedvacations(userId,vacationId)
  VALUES(${data.user} ,${data.vacation})`;
  const vacation = await dal.executeAsync(sql);
  return vacation;
}

async function getFollowedVacations(userId) {
  const sql = `SELECT vacationId FROM savedvacations 
  where ${userId} = userId`;
  const vacations = await dal.executeAsync(sql);
  return vacations;
}

async function deleteFollowedVacation(userId, vacationId) {
  const sql = `DELETE FROM savedvacations WHERE userId = ${userId} and vacationId = ${vacationId}`;
  await dal.executeAsync(sql);
}

async function getAllFollowedVacations() {
  const sql = "SELECT * FROM savedvacations";
  const vacations = await dal.executeAsync(sql);
  return vacations;
}

async function addNewVacation(vacation) {
  const sql = `INSERT INTO vacations VALUES( DEFAULT, "${vacation.destination}",
    " ${vacation.image}", "${vacation.description}", "$${fixDateFormat(
    vacation.start_date
  )}",
     " ${fixDateFormat(vacation.end_date)}", ${vacation.price}, DEFAULT);`;
  const info = await dal.executeAsync(sql);
  vacation.vacationId = info.insertId;

  return vacation;
}

async function updateVacation(vacation) {
  const sql = `
      UPDATE vacations SET
      destination = '${vacation.destination}',
      image = '${vacation.image}',
      description = '${vacation.description}',
      start_date = '${fixDateFormat(vacation.start_date)}',
      end_date = '${fixDateFormat(vacation.end_date)}',
      price = ${vacation.price}
      WHERE vacationId = ${vacation.vacationId}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? null : vacation;
}

async function deleteVacation(id) {
  const sql = `DELETE FROM vacations WHERE vacationId = ${id};`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? false : true;
}

function fixDateFormat(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  return `${year}-${month}-${day}`;
}

module.exports = {
  getAllVacations,
  getOneVacation,
  updateVacation,
  addNewVacation,
  deleteVacation,
  fixDateFormat,
  followVacation,
  getFollowedVacations,
  deleteFollowedVacation,
  getAllFollowedVacations,
};
