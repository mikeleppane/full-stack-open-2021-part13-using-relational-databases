const Blog = require("../models/blog");
const User = require("../models/user");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.username);
  next();
};

module.exports = { blogFinder, userFinder };
