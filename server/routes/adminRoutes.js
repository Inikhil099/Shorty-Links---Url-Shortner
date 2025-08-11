const express = require("express")
const { GetDetailsForAdmin } = require("../controllers/adminController")
const router = express.Router()

router.get("/",GetDetailsForAdmin)

module.exports = router;