const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
//configure for relationships
User.hasMany(Post, {
  foreignKey: "user_id", //tell it what the key is
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});
//configure many to many vote relationships
User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

Post.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

//configure direct relationship for votes table
Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Post.hasMany(Vote, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Vote };
