const express = require("express");
const passport_Conf = require("./passport");
const routeConfig = require("./RouteConfig");
const Route = express.Router();
const fonction = require("../fonction");

Route.get("/", fonction.isguest, routeConfig.getIndex);

Route.get("/connexion", fonction.isguest,routeConfig.getConnexion);

Route.get("/inscription", fonction.isguest,routeConfig.getInscription);

Route.get("/perso", fonction.loggedIn, routeConfig.getPerso);

Route.get("/modifierProfil/:id", fonction.loggedIn, routeConfig.getModifierProfil);

Route.put("/modifier/utilisateur/:id", routeConfig.putModifierUtilisateur);

Route.get("/lecture/:id", fonction.loggedIn, routeConfig.getLectureId);

Route.post("/connexion", routeConfig.postPassport);

Route.post("/inscription", routeConfig.postInsciption);

Route.post("/message", routeConfig.postMessage);

Route.delete("/logout",  routeConfig.deteleLogout);

module.exports = Route;
