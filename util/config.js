require("dotenv").config();

module.exports = {
  POSTGRES_URI: process.env.POSTGRES_URI,
  PORT: process.env.PORT || 3003,
  SECRET: process.env.SECRET,
};
