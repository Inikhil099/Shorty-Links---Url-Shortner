const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.status(400).send("You're not logged in");
  }
  const user = getUser(userUid);
  if (!user) {
    return res.status(400).send("You're not authenticated login first");
  }

  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly };
