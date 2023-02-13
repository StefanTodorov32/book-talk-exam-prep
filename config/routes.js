const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");

module.exports = (app) => {
  app.use("/", bookController);
  app.use("/auth", authController);
  app.get("/*", (req, res)=>{
      res.render("404")
  })
};
