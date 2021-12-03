const authorRouter = require("express").Router();

const { Blog } = require("../models");
const { sequelize } = require("../util/db");

authorRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    group: ["author"],
    attributes: [
      "author",
      [sequelize.fn("count", sequelize.col("title")), "blogs"],
      [sequelize.fn("sum", sequelize.col("likes")), "likes"],
    ],
    order: [[sequelize.col("likes"), "DESC"]],
  });
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

module.exports = authorRouter;
