const express = require("express");
const routes = express.Router();
const teamControllers = require("../controller/team");
const isAdmin = require("../middlewares/admin").isAuth;


routes.post('/add-new', isAdmin, teamControllers.addNewTeam);
routes.get("/get-all", teamControllers.getAllTeams);
routes.post("/edit-team", teamControllers.editTeam);
module.exports = routes;