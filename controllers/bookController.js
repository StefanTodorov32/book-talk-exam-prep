const { Router } = require("express");
const { isOwner, hasUser } = require("../middlewares/guards");
const {
  createBook,
  getAllBooks,
  getBookById,
  editBook,
  deleteBook,
  wishBook,
  isBookWishedByUser,
  getUserBooks,
} = require("../services/bookService");
const { parseError } = require("../util/parser");

const router = require("express").Router();
// TODO: routes
router.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
  });
});
router.get("/catalog", async (req, res) => {
  const books = await getAllBooks();
  res.render("catalog", { books });
});
router.get("/create", (req, res) => {
  res.render("create");
});
router.post("/create", async (req, res) => {
  const { title, author, review, image, stars, genre } = req.body;
  try {
    const body = await createBook({
      title,
      author,
      review,
      stars,
      genre,
      image,
      owner: req.user._id,
    });
    res.redirect("/catalog");
  } catch (error) {
    const errors = parseError(error);
    res.render("create", {
      body: {
        title,
        author,
        review,
        stars,
        image,
        genre,
      },
      title: "Create Page",
      errors,
    });
  }
});
router.get("/details/:id", async (req, res) => {
  const book = await getBookById(req.params.id);
  let isOwner;
  let isWished;
  if (req.user) {
    isOwner = req.user._id == book.owner;
    isWished = await isBookWishedByUser(req.params.id, req.user._id);
  }
  res.render("details", { book, isOwner, isWished });
});
router.get("/edit/:id", isOwner(), async (req, res) => {
  const book = await getBookById(req.params.id);
  res.render("edit", { book });
});
router.post("/edit/:id", isOwner(), async (req, res) => {
  const { title, author, review, image, stars, genre } = req.body;
  try {
    const body = await editBook(req.params.id, {
      title,
      author,
      review,
      image,
      stars,
      genre,
    });
    res.redirect("/details/" + req.params.id);
  } catch (error) {
    const errors = parseError(error);
    console.log(errors);
    res.render(`/edit/${req.params.id}`, {
      body: {
        title,
        author,
        review,
        stars,
        image,
        genre,
      },
      title: "Edit Page",
      errors,
    });
  }
});
router.get("/delete/:id", isOwner(), async (req, res) => {
  await deleteBook(req.params.id);
  res.redirect("/catalog");
});
router.get("/wish/:id", hasUser(), async (req, res) => {
  const wishedbook = await wishBook(req.params.id, req.user._id);
  console.log(wishedbook);
  res.redirect(`/details/${req.params.id}`);
});
router.get("/profile", hasUser(), async (req, res) => {
  const books = await getUserBooks(req.user._id);
  res.render("profile", { books });
});

module.exports = router;
