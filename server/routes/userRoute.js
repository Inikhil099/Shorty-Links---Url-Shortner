const express = require("express");
const { handleLogin, handleSignup, getUserData } = require("../controllers/userController");
const router = express.Router();


router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/get-user-data",getUserData)

module.exports = router;
