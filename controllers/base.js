const mongoose = require("mongoose");
mongoose.connect(process.env.DATA_BASE, (err) => {
  if (err) return console.log("Erreur de connexion à la base de donnée");
  console.log("Connexion à la base de donnée reussie 5/5 ");
});

module.exports = mongoose;
