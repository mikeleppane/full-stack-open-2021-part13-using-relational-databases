const readinglistRouter = require("express").Router();

const User = require("../models/user");
const Readinglist = require("../models/readinglist");
const tokenExtractor = require("../middleware/tokenExtractor");

readinglistRouter.post("/", tokenExtractor, async (req, res) => {
  if (!req.body.blog_id) {
    return res.status(400).json({
      error: "blog_id is missing",
    });
  }
  if (!req.body.user_id) {
    return res.status(400).json({
      error: "user_id is missing",
    });
  }
  const user = await User.findByPk(req.decodedToken.id);
  const isValidUser = user.id === req.body.user_id;
  if (!isValidUser) {
    return res.status(400).json({
      error: "Only valid user can add blog to the readinglist",
    });
  }
  const readinglist = await Readinglist.create({
    userId: req.body.user_id,
    blogId: req.body.blog_id,
  });
  console.log(JSON.stringify(readinglist, null, 2));
  res.json(readinglist);
});

module.exports = readinglistRouter;
