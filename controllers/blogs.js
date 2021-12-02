const blogRouter = require("express").Router();

const { Blog } = require("../models");
const { blogFinder } = require("../middleware/finders");
const tokenExtractor = require("../middleware/tokenExtractor");
const User = require("../models/user");
const { Op } = require("sequelize");
const { sequelize } = require("../util/db");

blogRouter.get("/", async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: "%" + req.query.search + "%",
          },
        },
        {
          author: {
            [Op.iLike]: "%" + req.query.search + "%",
          },
        },
      ],
    };
  }
  const blogs = await Blog.findAll({
    include: { model: User },
    order: sequelize.literal("likes DESC"),
    where,
  });
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

blogRouter.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  console.log(JSON.stringify(blog, null, 2));
  res.json(blog);
});

blogRouter.get("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: "invalid id" }).end();
  }
});

blogRouter.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = req.blog;
  const isValidUser = user.id === blog.userId;
  if (isValidUser) {
    if (blog) {
      await blog.destroy();
    } else {
      res.status(404).json({ error: "invalid id" }).end();
    }
    res.status(204).end();
  }
});

blogRouter.put("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  if (blog) {
    if (!req.body.likes) {
      return res.status(400).json({
        error: "likes is missing",
      });
    }
    blog.likes = req.body.likes;
    await blog.save();
    console.log(
      `Blog updated and saved successfully: ${JSON.stringify(blog, null, 2)}`
    );
    res.json(blog);
  } else {
    res.status(404).json({ error: "invalid id" }).end();
  }
});

module.exports = blogRouter;
