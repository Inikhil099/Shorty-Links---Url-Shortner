const express = require("express")
const router = express.Router();
const {generateNew, GoToTheUrl} = require("../controllers/controller")


router.get('/:shortid',GoToTheUrl)

router.post('/',generateNew)

module.exports = router;