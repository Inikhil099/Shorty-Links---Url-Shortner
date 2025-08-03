const express = require("express");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");
const { getUserData } = require("../controllers/userController");
const router = express.Router()


router.get("/get-user-data",restrictToLoggedinUserOnly, getUserData);

module.exports = router