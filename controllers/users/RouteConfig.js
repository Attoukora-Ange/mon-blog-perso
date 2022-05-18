const passport = require("passport");
const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
const Articles = require("../../models/Articles");


module.exports.getIndex = async (req, res) => {
  const articles = await Articles.find();
  res.render("index", { tite_blog: "Acceuil", articles, user: req.user });
};
module.exports.getConnexion = (req, res) => {
const errors = req.flash().error
  res.render("connexion", { tite_blog: "Connexion", user: req.user, errors });
};
module.exports.getInscription = (req, res) => {
  res.render("inscription", { tite_blog: "Inscription", user: req.user });
};
module.exports.getPerso = async (req, res) => {
  const articles = await Articles.find();
  const utilisateur = await Users.findById({ _id: req.user });
  res.render("perso", {
    tite_blog: "Personnelle",
    articles,
    user: req.user,
    utilisateur,
  }); 
};
module.exports.getLectureId = async (req, res) => {
  const id = req.params.id;
  const articles = await Articles.findOne({_id: id});
  const utilisateur = await Users.findById({ _id: req.user });
  res.render("lecture", {
    tite_blog: "Personnelle",
    articles,
    user: req.user,
    utilisateur,
  });
};

module.exports.deteleLogout = (req, res) => {
  req.logOut();
  res.redirect("/connexion");
};
module.exports.postMessage = async (req, res) => {
  if(req.user){
    const utilisateur = await Users.findById({ _id: req.user});
   return res.render("message", { tite_blog: "Message", user: req.user, utilisateur });
  }
  return res.render("message", { tite_blog: "Message", user: req.user});
};

module.exports.postPassport = passport.authenticate("local", {
  successRedirect: "/perso",
  failureRedirect: "/connexion",
  failureFlash: true,
});
module.exports.postInsciption = async (req, res) => {
  await Users.findOne({ email: process.env.ADMIN }).then(async (user) => {
    let { nom, prenom, email, password } = req.body;
    if (user.email == email) return res.redirect("/inscription");

    const passhash = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, passhash);
    const User = new Users({ nom, prenom, email, password: password });

    User.save()
      .then(() => console.log("Utilisateur créé avec success"))
      .catch(() => console.log("Erreur d'enregistrement de l'utilisateur"));

    req.flash('message_success', 'Enregistrement à reussir, veuillez vous connecté...');
    res.redirect('/connexion')
  });
};
module.exports.getModifierProfil = async (req, res) => {
  const id = req.params.id
  const utilisateur = await Users.findOne({_id: id});

  res.render("modifierProfil", {
    tite_blog: "Mon profil",
    user: req.user,
    utilisateur,
  });
}
module.exports.putModifierUtilisateur =  async (req, res) => {
  const id = req.params.id;
  const passhash = await bcrypt.genSalt(10);
  const modifierPass = await bcrypt.hash(req.body.password, passhash);


  await Users.findByIdAndUpdate(
    { _id: id },
    {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: modifierPass,
    }
  );
  res.redirect("/perso");
}
