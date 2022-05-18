const express = require("express");
const Articles = require("../../models/Articles");
const Users = require("../../models/Users");
const fonction = require("../fonction");
const ConfigAdmin = require("./ConfigAdim");
const multer = require('multer');

const ROUTE = express.Router();

const stock = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'public/images/article')
  },
  filename:(req, file, cb) =>{
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({storage: stock});

ROUTE.get("/editArticle", fonction.loggedIn, ConfigAdmin.getEditerArticle);

ROUTE.get(
  "/mesUtilisateurs",
  fonction.loggedIn,
  ConfigAdmin.getMesUtilisateurs
);

ROUTE.get(
  "/article/modifier/:id",
  fonction.loggedIn,
  ConfigAdmin.getModifierArticle
);

ROUTE.post("/editArticle", upload.single('image_article') , fonction.loggedIn, ConfigAdmin.postEditerArticle);

ROUTE.put("/article/modifier/:id",  upload.single('image_article') ,ConfigAdmin.putModifierArticle);

ROUTE.delete("/mesUtilisateurs/:id", ConfigAdmin.deleteUtilisateur);

ROUTE.delete("/article/supprimer/:id", ConfigAdmin.deleteArticle);

module.exports = ROUTE;
