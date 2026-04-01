const express = require("express")
const router = express.Router();
const {generateNew, GoToTheUrl, GetAllUrls} = require("../controllers/controller");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");


router.get('/goto/:shortid',GoToTheUrl)
router.post('/',restrictToLoggedinUserOnly,generateNew)
router.get("/allurls",restrictToLoggedinUserOnly,GetAllUrls)

module.exports = router;