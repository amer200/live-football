const express = require("express");
const routes = express.Router();
const matchController = require("../controller/match");
const isAdmin = require("../middlewares/admin").isAuth;

routes.post('/add-categ', matchController.addCateg);
routes.post('/edit-categ', matchController.editCateg);
routes.get('/remove-categ/:id', matchController.removeCateg);
routes.get('/get-all-categ', matchController.getAllCateg);
routes.get('/get-categ-by-name/:name', matchController.getCategByName);
routes.get('/get-categ-by-id/:id', matchController.getCategById);
module.exports = routes;
