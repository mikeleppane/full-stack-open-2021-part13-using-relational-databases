const userRouter = require("express").Router();

const { User } = require("../models");
const { userFinder } = require("../middleware/finders");
const Blog = require("../models/blog");

userRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ["userId"] } },
  });
  console.log(JSON.stringify(users, null, 2));
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

userRouter.get("/:username", userFinder, async (req, res) => {
  const user = req.user;
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

userRouter.put("/:username", userFinder, async (req, res) => {
  const user = req.user;
  if (user) {
    if (!req.body.username) {
      return res.status(400).json({
        error: "username is missing",
      });
    }
    user.likes = req.body.username;
    await user.save();
    console.log(
      `User updated and saved successfully: ${JSON.stringify(user, null, 2)}`
    );
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = userRouter;
