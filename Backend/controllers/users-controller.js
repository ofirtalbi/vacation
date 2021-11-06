const express = require("express");
const router = express.Router();
const logic = require("../bll/users-bll");

router.get("/users", async (_request, response) => {
  try {
    const users = await logic.getAllUsersAsync();
    response.json(users);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// router.get("/login", async (request, response) => {
//   try {
//     const user = request.body;

//     const fullUserDetails = await logic.verifyUserOnLogin();
//     response.json(fullUserDetails);
//   } catch (err) {
//     response.status(500).send(err.message);
//   }
// });

router.post("/users", async (request, response) => {
  try {
    const newUser = await logic.postNewUserAsync(request.body);
    console.log(request.body.username);

    response.json(newUser);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
module.exports = router;
