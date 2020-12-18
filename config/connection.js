//import sequelize
const Sequelize = require("sequelize");
const { sequelize } = require("../models/Comment");

require("dotenv").config(); // For loading env variables
//create the connection to the database
let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME, //vars set up in .env
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
