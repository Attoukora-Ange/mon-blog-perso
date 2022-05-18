const Articles = require("../../models/Articles");
const Users = require("../../models/Users");

module.exports.getEditerArticle = async (req, res) => {
  const utilisateur = await Users.findById({ _id: req.user });
  if (utilisateur.email != process.env.ADMIN) return res.redirect("/perso");
  res.render("editArticle", {
    tite_blog: "Editer article",
    user: req.user,
    utilisateur,
  });
};
module.exports.getMesUtilisateurs = async (req, res) => {
  const utilisateur = await Users.findById({ _id: req.user });
  const mesUtilisateurs = await Users.find();
  if (utilisateur.email != process.env.ADMIN) return res.redirect("/perso");
  res.render("mesUtilisateurs", {
    tite_blog: "Mes utilisateurs",
    user: req.user,
    utilisateur,
    mesUtilisateurs,
  });
};
module.exports.getModifierArticle = async (req, res) => {
  const id = req.params.id;
  const utilisateur = await Users.findById({ _id: req.user });
  const modifierArticle = await Articles.findOne({ _id: id });
  if (utilisateur.email != process.env.ADMIN) return res.redirect("/perso");
  res.render("modifierArticle", {
    tite_blog: "Modifier article",
    user: req.user,
    utilisateur,
    modifierArticle,
  });
};

module.exports.postEditerArticle = (req, res) => {
  const titre_article = req.body.titre_article;
  const auteur_article = req.body.auteur_article;
  const date_parution = req.body.date_parution;
  const image_article = req.file.filename;
  const resume_article = req.body.resume_article;
  const contenu_article = req.body.contenu_article;

  const newArticle = new Articles({
    titre_article,
    auteur_article,
    date_parution,
    image_article ,
    resume_article,
    contenu_article,
  });
  newArticle
    .save()
    .then(() => console.log("Article créé avec success"))
    .catch((e) => console.log("Erreur d'enregistrement de le l'article" + e));
  res.redirect("/perso");
};
module.exports.putModifierArticle = async (req, res) => {
  const id = req.params.id;
  await Articles.findByIdAndUpdate(
    { _id: id },
    {
      titre_article: req.body.titre_article,
      auteur_article: req.body.auteur_article,
      date_parution: req.body.date_parution,
      image_article: req.file.filename,
      resume_article: req.body.resume_article,
      contenu_article: req.body.contenu_article,
    }
  );
  res.redirect("/perso");
};

module.exports.deleteUtilisateur = async (req, res) => {
  const id = req.params.id;
  await Users.findByIdAndDelete({ _id: id });
  res.redirect("/admin/mesUtilisateurs");
};
module.exports.deleteArticle = async (req, res) => {
  const id = req.params.id;
  await Articles.findByIdAndDelete({ _id: id });
  res.redirect("/perso");
};
