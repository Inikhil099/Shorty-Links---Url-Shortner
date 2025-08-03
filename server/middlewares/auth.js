const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.status(400).redirect("http://localhost:5173")
  }
  const user = getUser(userUid);
  if (!user) {
    return res.status(400).redirect("http://localhost:5173");
  }

  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly };
