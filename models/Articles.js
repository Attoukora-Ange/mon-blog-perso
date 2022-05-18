const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  titre_article: {
    type: String,
    required: true,
  },
  auteur_article: {
    type: String,
    required: true,
  },
  date_parution: {
    type: String,
    required: true,
  },
  image_article: {
    type: String,
    required: true,
  },
  resume_article: {
    type: String,
    required: true,
  },
  contenu_article: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("article", articleSchema);
