const User = require("../models/user");
const Session = require("../models/session");

const sessionValidator = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  const session = await Session.findOne({ where: { userId: user.id } });
  if (!session) {
    return res
      .status(401)
      .json({ error: `User ${user.id} does not have any session` });
  }
  if (!session.token) {
    return res
      .status(401)
      .json({ error: `User ${user.id} is already logout.` });
  }
  const authorizationToken = req.get("authorization").substring(7);
  if (!(session.token === authorizationToken)) {
    return res
      .status(401)
      .json({ error: `User ${user.id} token is not valid anymore.` });
  }
  next();
};

module.exports = sessionValidator;
