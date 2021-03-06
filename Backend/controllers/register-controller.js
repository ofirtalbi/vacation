const express = require("express");
const router = express.Router();
const registerLogic = require("../bll/register-bll");

router.post("/", async (request, response) => {
  try {
    const user = request.body;
    const newUser = await registerLogic.addUser(user);
    if (newUser === 0) {
      throw "Username already exists";
    }
    if (newUser === 1) {
      throw "Something is missing";
    }
    response.status(201).json(newUser);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
