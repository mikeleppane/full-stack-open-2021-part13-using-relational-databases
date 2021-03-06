const readinglistRouter = require("express").Router();

const User = require("../models/user");
const Readinglist = require("../models/readinglist");
const tokenExtractor = require("../middleware/tokenExtractor");
const sessionValidator = require("../middleware/sessionValidator");

readinglistRouter.post(
  "/",
  tokenExtractor,
  sessionValidator,
  async (req, res) => {
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
  }
);

readinglistRouter.put(
  "/:id",
  tokenExtractor,
  sessionValidator,
  async (req, res) => {
    if (!req.body.read) {
      return res.status(400).json({
        error: "read is missing",
      });
    }
    const user = await User.findByPk(req.decodedToken.id);
    if (!user) {
      return res.status(400).json({
        error: "Not valid user",
      });
    }

    const readinglist = await Readinglist.findOne({
      where: {
        userId: user.id,
        blogId: req.params.id,
      },
    });
    if (!readinglist) {
      return res.status(400).json({
        error: "Cannot find any readinglist for a user.",
      });
    }

    readinglist.read = req.body.read;
    await readinglist.save();
    console.log(
      `Readinglist updated and saved successfully: ${JSON.stringify(
        readinglist,
        null,
        2
      )}`
    );
    res.json(readinglist);
  }
);

module.exports = readinglistRouter;
