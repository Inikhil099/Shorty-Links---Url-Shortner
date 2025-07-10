const express = require("express")
const router = express.Router();
const {generateNew, GoToTheUrl, GetAllUrls} = require("../controllers/controller")


router.get('/goto/:shortid',GoToTheUrl)
router.post('/',generateNew)
router.get("/allurls",GetAllUrls)

module.exports = router;