global.config = require("./config.json");
const PORT = 3002;

const express = require("express");
const server = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const socketIO = require("socket.io");
const registerController = require("./controllers/register-controller");
const loginController = require("./controllers/login-controller");
const vacationController = require("./controllers/vacation-controller");
const vacationsLogic = require("./bll/vacation-bll");

server.use(fileUpload());
server.use(cors());
server.use(express.json());

if (!fs.existsSync("../Front/public/assets/images/vacations")) {
  fs.mkdirSync("../Front/public/assets/images/vacations");
}

server.use("/api/register", registerController);
server.use("/api/login", loginController);
server.use("/api/vacations", vacationController);

const expressListener = server.listen(3002, () =>
  console.log(`Listening on port ${PORT}...`)
);
const socketIOServer = socketIO(expressListener);
socketIOServer.sockets.on("connection", async (socket) => {
  socket.on("get-all-vacations", async () => {
    socketIOServer.sockets.emit(
      "get-all-vacations",
      await vacationsLogic.getAllVacations()
    );
  });
  socket.on("msg-from-client", (msg) => console.log(socket.id + ": " + msg));
});
