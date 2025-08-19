const URL = require("../models/urlModel")
const Users = require("../models/usersModel")

async function GetDetailsForAdmin(req,res) {
    try {
        return res.send("inside the admin data")
        const AllUsers = await Users.find({})
        const AllUrls = await URL.find({}).populate("createdBy")
        return res.status(200).json({details:{AllUrls,AllUsers}})
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = {GetDetailsForAdmin}