function isguest(req, res, next) {
  if (req.user) {
    res.redirect("perso");
  } else {
    req.flash("message_error");
    next();
  }
}
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/connexion");
  }
}

module.exports = { isguest, loggedIn };
