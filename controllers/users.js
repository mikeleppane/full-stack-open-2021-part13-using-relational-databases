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

userRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: "markedReadings",
        attributes: {
          include: ["url", "title", "author", "likes", "year", "read"],
          exclude: ["createdAt", "updatedAt", "userId"],
        },
        through: {
          attributes: {
            exclude: ["userId", "blogId"],
          },
        },
      },
    ],
  });
  if (user) {
    let readings;
    if (req.query.read) {
      readings = user.markedReadings
        .filter((reading) => reading.read.toString() === req.query.read)
        .map((reading) => {
          return {
            id: reading.id,
            url: reading.url,
            title: reading.title,
            author: reading.author,
            likes: reading.likes,
            year: reading.year,
            readinglists: { id: reading.readinglist.id, read: reading.read },
          };
        });
    } else {
      readings = user.markedReadings.map((reading) => {
        return {
          id: reading.id,
          url: reading.url,
          title: reading.title,
          author: reading.author,
          likes: reading.likes,
          year: reading.year,
          readinglists: { id: reading.readinglist.id, read: reading.read },
        };
      });
    }

    const modUser = {
      name: user.name,
      username: user.username,
      readings: readings,
    };
    console.log(JSON.stringify(modUser, null, 2));
    res.json(modUser);
  } else {
    res.status(404).end();
  }
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
