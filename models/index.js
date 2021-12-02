const Blog = require("./blog");

Blog.sync().catch((error) => console.error(error));

module.exports = {
  Blog,
};
