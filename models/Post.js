const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//define post model
class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    user_id: {
      // the id of the user that made the post
      type: DataTypes.INTEGER,
      references: {
        // this is the part that sets up relation to the user db
        model: "user",
        key: "id", // the key is the id col from the user
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);
module.exports = Post;
