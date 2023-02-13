const { hasUser, isGuest } = require("../middlewares/guards");
const { register, login } = require("../services/userService");
const { parseError } = require("../util/parser");

const router = require("express").Router();

router.get("/register",isGuest(), (req, res) => {
  // TODO: replace with actual views
  res.render("register", {
    title: "Register Page",
  });
});
router.post("/register",isGuest(), async (req, res) => {
  try {
    if (
      req.body.username == "" ||
      req.body.email == "" ||
      req.body.password == ""
    ) {
      throw new Error("All fields are required");
    }
    if (req.body.password != req.body.repeatPassword) {
      throw new Error("Password's don't match!");
    }
    //TODO check if register make session
    const token = await register(
      req.body.username,
      req.body.email,
      req.body.password
    );

    res.cookie("token", token);
    res.redirect("/");
  } catch (error) {
    //TODO: add erorr showing
    const errors = parseError(error);
    res.render("register", {
      title: "Register Page",
      errors,
      body: {
        username: req.body.username,
        email: req.body.email,
      },
    });
  }
});
router.get("/login",isGuest(), (req, res) => {
  res.render("login", {
    title: "Login Page",
  });
});
router.post("/login",isGuest(), async (req, res) => {
  try {
    if (req.body.email == "" || req.body.password == "") {
      throw new Error("All fields are required");
    }
    const token = await login(req.body.email, req.body.password);
    res.cookie("token", token);

    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    console.log(errors)
    res.render("login", {
      title: "Login Page",
      errors,
      body: {
        username: req.body.username,
      },
    });
  }
});
router.get("/logout",hasUser(), (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});
module.exports = router;
