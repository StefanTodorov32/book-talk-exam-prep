const { getBookOwner } = require("../services/bookService");

function hasUser() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/auth/login");
    }
  };
}
function isGuest() {
  return (req, res, next) => {
    if (req.user) {
      res.redirect("/"); // TODO: Check assignment for correct redirect
    } else {
      next();
    }
  };
}
function isOwner() {
  return async (req, res, next) => {
    const isBookOwner = await getBookOwner(req.params.id, req.user._id);
    if (isBookOwner === true) {
      return next();
    } else {
      return res.redirect("/404");
    }
  };
}

module.exports = {
  isGuest,
  hasUser,
  isOwner,
};
