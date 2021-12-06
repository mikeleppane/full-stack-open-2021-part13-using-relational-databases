const Blog = require("./blog");
const User = require("./user");
const Readinglist = require("./readinglist");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(User, { through: Readinglist });
User.belongsToMany(Blog, { through: Readinglist });
User.hasMany(Readinglist);
Readinglist.belongsTo(User);
Blog.hasMany(Readinglist);
Readinglist.belongsTo(Blog);

module.exports = {
  Blog,
  User,
};
