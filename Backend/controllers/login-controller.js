const express = require("express");
const router = express.Router();
const loginLogic = require("../bll/login-bll");
const jwt = require("jsonwebtoken");
const jwtLogic = require("../bll/jwt-logic");

router.post("/", async (request, response) => {
  try {
    const user = request.body;
    const userLogin = await loginLogic.login(user);
    if (userLogin === 0) {
      throw "Username / Password is wrong";
    }
    response.status(201).json(userLogin);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/login-check", jwtLogic.verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.json(err);
    } else {
      res.json(authData);
    }
  });
});
router.post("/login-save", (req, res) => {
  const user = req.body;
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({ token });
  });
});

module.exports = router;
