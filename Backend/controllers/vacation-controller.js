const express = require("express");
const router = express.Router();
const logic = require("../bll/vacation-bll");
const jwtLogic = require("../bll/jwt-logic");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const uuid = require("uuid");

router.get("/", async (_request, response) => {
  try {
    const vacations = await logic.getAllVacations();
    response.json(vacations);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const vacation = await logic.getOneVacation(id);
    response.json(vacation[0]);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post(
  "/new-vacation",
  jwtLogic.verifyToken,
  async (request, response) => {
    try {
      jwt.verify(request.token, "secretkey", (err, authData) => {
        if (authData.user.isAdmin !== 1) {
          throw "Error !";
        }
      });
      if (!request.files) {
        response.status(400).send("No File Sent !");
        return;
      }
      const vacation = JSON.parse(request.body.vacation);
      const file = request.files.image;
      const randomName = uuid.v4();
      const extension = file.name.substr(file.name.lastIndexOf("."));
      file.mv(
        "../Front/public/assets/images/vacations/" + randomName + extension
      );
      vacation.image = randomName + extension;
      const newVacation = await logic.addNewVacation(vacation);
      response.status(201).json(newVacation);
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

router.patch("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const vacation = new VacationModel(request.body);
    vacation.id = id;

    const updatedVacation = await logic.patchVacationAsync(vacation);
    if (!updatedVacation) {
      return response.status(400).json({ messege: "oops" });
    }
    response.status(200).json(updatedVacation);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/followVacation", async (request, response) => {
  try {
    const info = request.body;
    const sendInfo = await logic.followVacation(info);
    response.json(sendInfo);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/get-followed-vacations/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const vacations = await logic.getFollowedVacations(id);
    response.json(vacations);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete(
  "/delete-vacation",
  jwtLogic.verifyToken,
  async (request, response) => {
    try {
      jwt.verify(request.token, "secretkey", (err, authData) => {
        if (authData.user.isAdmin !== 1) {
          throw "Error !";
        }
      });

      const vacation = request.body;
      fs.unlinkSync(
        `../Front/public/assets/images/vacations/${vacation.image}`
      );
      await logic.deleteVacation(vacation.vacationId);
      response.sendStatus(204);
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

router.put(
  "/update-vacation",
  jwtLogic.verifyToken,
  async (request, response) => {
    try {
      jwt.verify(request.token, "secretkey", (err, authData) => {
        if (authData.user.isAdmin !== 1) {
          throw "Error !";
        }
      });
      const randomName = uuid.v4();
      const vacation = JSON.parse(request.body.vacation);
      if (request.files) {
        const file = request.files.image;
        fs.unlinkSync(
          `../Front/public/assets/images/vacations/${vacation.image}`
        );
        const extension = file.name.substr(file.name.lastIndexOf("."));
        file.mv(
          "../Front/public/assets/images/vacations/" + randomName + extension
        );
        vacation.image = randomName + extension;
      }

      const updatedVacation = await logic.updateVacation(vacation);
      response.json(updatedVacation);

      if (updatedVacation === null) {
        response.sendStatus(404);
        return;
      }
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

router.get(
  "/followed/get-all",
  jwtLogic.verifyToken,
  async (request, response) => {
    try {
      jwt.verify(request.token, "secretkey", (err, authData) => {
        if (authData.user.isAdmin !== 1) {
          throw "Error !";
        }
      });
      const vacations = await logic.getAllFollowedVacations();
      response.json(vacations);
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

router.delete("/delete/:vacationId/:userId", async (request, response) => {
  try {
    const userId = +request.params.userId;
    const vacationId = +request.params.vacationId;
    await logic.deleteFollowedVacation(userId, vacationId);
    response.sendStatus(204);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
