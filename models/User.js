const { Model, DataTypes } = require("sequelize"); //sqlize model
const sequelize = require("../config/connection"); // db connection
const bcrypt = require("bcrypt");
//create our user model

class User extends Model {
  //check passwords
  checkPassword(loginPw) {
    // method
    return bcrypt.compareSync(loginPw, this.password); // compare plaintextPassword with hased personal password
  }
}
//define table and col config

User.init(
  {
    //table col def - takes in array of column objects
    //id col
    id: {
      //use sequelize data types to specify
      type: DataTypes.INTEGER,
      //same as not null option insql
      allowNull: false,
      //instruct that this is primary key
      primaryKey: true,
      //turn on autoincrament
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //donot allow duplicates
      unique: true,
      //if allownull is false we can run through validator
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //means pwd must be at least 4 char logn
        len: [4],
      },
    },
  },
  {
    hooks: {
      //set up beforeCreate lifecycle hooks functionality
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //when we send in an update command
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    }, //for bcrypt
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
