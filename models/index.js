const Blog = require("./blog");
const User = require("./user");
const Readinglist = require("./readinglist");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(User, { through: Readinglist, as: "usersMarked" });
User.belongsToMany(Blog, { through: Readinglist, as: "markedReadings" });

module.exports = {
  Blog,
  User,
};
