const User = require("../models/usersModel");
const {setUser, getUser } = require("../service/auth")

async function handleSignup(req, res) {
  try {
    console.log("inside catch")
    const { firstname, lastname, email, password } = req.body.userData;
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
    }); 

    const token = setUser(user)
    res.cookie("uid", token,{ maxAge: 60 * 60 * 1000, httpOnly: true })

    
    console.log("ending catch")

    return res.json({ user })
  } catch (error) {
    return res.status(500).send("Internal server error")
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      password,
    });
    if (!user) {

      return res.status(400).send("User Not Fount");
    }
    const token = setUser(user)
    res.cookie("uid", token,{ maxAge: 60 * 60 * 1000, httpOnly: true })
    return res.json({ user })
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
}


async function getUserData(req, res) {
  try {
    const token = req.cookies?.uid
    const user = getUser(token)
    if(!user){
      return res.status(400).send("user not authorised")
    }

    const userdetails = await User.findById(user._id)
    if(!userdetails){
      res.status(400).send("user not found")
    }

    return res.json({ userdetails })
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
}

module.exports = { handleSignup, handleLogin,getUserData };
