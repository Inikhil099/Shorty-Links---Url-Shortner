const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies.uid;
  if (!userUid) {
    return res.status(400).send("Login First 1")
  }
  const user = getUser(userUid);
  if (!user) {
    return res.status(400).send("error from the middle ware Login First");
  }

  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly };
