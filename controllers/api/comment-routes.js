const router = require("express").Router();
const Comment = require("../../models/Comment");
console.log(Comment);
//get comments
router.get("/", (req, res) => {});
//add comment
router.post("/", (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});
//remove a comment
router.delete("/:id", (req, res) => {});

module.exports = router;
