const express = require("express");
const routes = express.Router();
const matchController = require("../controller/match");
const isAdmin = require("../middlewares/admin").isAuth;

routes.post('/add-categ', isAdmin, matchController.addCateg);
routes.post('/edit-categ', isAdmin, matchController.editCateg);
routes.get('/remove-categ/:id', isAdmin, matchController.removeCateg);
routes.get('/get-all-categ', isAdmin, matchController.getAllCateg);
routes.get('/get-categ-by-name/:name', isAdmin, matchController.getCategByName);
routes.get('/get-categ-by-id/:id', isAdmin, matchController.getCategById);
//////////////////////////match/////////////////////////////////////
routes.post('/add-new-match', isAdmin,matchController.addMatch);
routes.get('/get-all-matchs',isAdmin, matchController.getAllMatch);
routes.get('/get-match-by-id/:id',isAdmin, matchController.getMatchById);
// routes.post('/match-urls', matchController.addUrls);
module.exports = routes;
