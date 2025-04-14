const express = require("express");
const routes = express.Router();
const userController = require("../controller/user");
const isAdmin = require("../middlewares/admin").isAuth;
routes.post("/create-user", isAdmin, userController.createUser);
routes.post("/log-in", userController.logIn);
routes.post("/update-subscription", isAdmin, userController.updateExtendSubscription);
routes.get("/get-all", isAdmin, userController.getAllUsers);
module.exports = routes;