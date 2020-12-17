const User = require("./User");
const Post = require("./Post");
//configure for relationships
User.hasMany(Post, {
  foreignKey: "user_id", //tell it what the key is
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});
module.exports = { User, Post };
