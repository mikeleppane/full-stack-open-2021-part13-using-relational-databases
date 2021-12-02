const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.sync({ alter: true }).catch((error) => console.error(error));
User.sync({ alter: true }).catch((error) => console.error(error));

module.exports = {
  Blog,
  User,
};
