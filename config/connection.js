//import sequelize
const Sequelize = require("sequelize");

require("dotenv").config(); // For loading env variables
//create the connection to the database

const sequelize = new Sequelize(
  process.env.DB_NAME, //vars set up in .env
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
