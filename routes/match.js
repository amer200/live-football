const express = require("express");
const routes = express.Router();
const matchController = require("../controller/match");
const isAdmin = require("../middlewares/admin").isAuth;
const { isAuthWithRoles } = require("../middlewares/isAuthWithRoles");
routes.post('/add-categ', isAdmin, matchController.addCateg);
routes.post('/edit-categ', isAdmin, matchController.editCateg);
routes.get('/remove-categ/:id', isAdmin, matchController.removeCateg);
routes.get('/get-all-categ', isAuthWithRoles(['admin', 'user']), matchController.getAllCateg);
routes.get('/get-categ-by-name/:name', isAuthWithRoles(['admin', 'user']), matchController.getCategByName);
routes.get('/get-categ-by-id/:id', isAuthWithRoles(['admin', 'user']), matchController.getCategById);
//////////////////////////match/////////////////////////////////////
routes.post('/add-new-match', isAdmin, matchController.addMatch);
routes.get('/get-all-matchs', isAuthWithRoles(['admin', 'user']), matchController.getAllMatch);
routes.get('/get-match-by-id/:id', isAuthWithRoles(['admin', 'user']), matchController.getMatchById);
routes.get('/delete-match/:id', matchController.removeMatch);
routes.post('/edit-match', matchController.editMatch);
module.exports = routes;