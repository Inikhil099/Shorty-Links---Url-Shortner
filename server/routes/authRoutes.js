const express = require("express");
const {
  handleLogin,
  handleSignup,
  getUserData,
  EmailNotVerifed,
  VerifyEmailOTP
} = require("../controllers/userController");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/emailverificationpage",restrictToLoggedinUserOnly, EmailNotVerifed);
router.post("/verifyEmailWithOTP",restrictToLoggedinUserOnly,VerifyEmailOTP)

module.exports = router;
