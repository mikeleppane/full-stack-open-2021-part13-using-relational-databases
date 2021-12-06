const logoutRouter = require("express").Router();
const User = require("../models/user");
const Session = require("../models/session");
const tokenExtractor = require("../middleware/tokenExtractor");
const sessionValidator = require("../middleware/sessionValidator");

logoutRouter.delete("/", tokenExtractor, sessionValidator, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(404).json({ error: "cannot find user" }).end();
  }
  const session = await Session.findOne({ where: { userId: user.id } });
  if (!session) {
    return res
      .status(404)
      .json({
        error: `no session available for user ${JSON.stringify(user, null, 2)}`,
      })
      .end();
  }
  session.token = "";
  await session.save();
  console.log(`User logout successfully: ${JSON.stringify(user, null, 2)}`);

  res.status(200).send("User logout");
});

module.exports = logoutRouter;
