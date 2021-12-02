const blogRouter = require("express").Router();

const { Blog } = require("../models");
const blogFinder = require("../middleware/blogFinder");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
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

blogRouter.delete("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  if (blog) {
    await blog.destroy();
  } else {
    res.status(404).json({ error: "invalid id" }).end();
  }
  res.status(204).end();
});

blogRouter.put("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  if (blog) {
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
