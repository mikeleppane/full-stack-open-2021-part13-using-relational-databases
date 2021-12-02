const blogRouter = require("express").Router();

const { Blog } = require("../models");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    console.log(JSON.stringify(blog, null, 2));
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy();
  } else {
    res.status(404).end();
  }
  res.status(204).end();
});

// blogRouter.put("/:id", async (req, res) => {
//   const blog = await Blog.findByPk(req.params.id);
//   if (blog) {
//     note.important = req.body.important;
//     await note.save();
//     res.json(note);
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = blogRouter;
