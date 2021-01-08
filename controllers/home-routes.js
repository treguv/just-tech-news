const router = require("express").Router();

const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

//get a single post
router.get("/post/:id", (req, res) => {
  //Find a single post based on the id in the query
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributed: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      //check for valid data
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      //serialize the data
      const post = dbPostData.get({ plain: true }); // get rid of garbage we dont need
      //pass data to the template
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/", (req, res) => {
  console.log("logging session");
  console.log(req.session);
  Post.findAll({
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      //pass in a single object
      //   console.log(dbPostData[0]); this gives a lot more data than we want
      const posts = dbPostData.map((post) => post.get({ plain: true })); // serialize all the posts
      res.render("homepage", { posts, loggedIn: req.session.loggedIn }); // render template, data to put in
    }) //The get gets rid of the unneeded data
    .catch((err) => {
      console.log("err");
      res.status(500).json(err);
    });
});
router.get("/login", (req, res) => {
  //Use session to check if the user is logged in
  console.log("is logged in?", req.session.loggedIn);
  if (req.session.loggedIn) {
    //if logged in redirect
    res.redirect("/");
    return;
  }
  res.render("login"); // this login corresponds to the login.handlebars file
});
// router.get("/", (req, res) => {
//   res.render("homepage", {
//     id: 1,
//     post_url: "https://handlebarsjs.com/guide/",
//     title: "Handlebars Docs",
//     created_at: new Date(),
//     vote_count: 10,
//     comments: [{}, {}],
//     user: {
//       username: "test_user",
//     },
//   }); // we can use render bc we hooked up a template engine
// }); // homepage corelates to homepage.handlebars

module.exports = router;
