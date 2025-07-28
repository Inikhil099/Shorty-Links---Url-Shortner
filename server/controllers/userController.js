const User = require("../models/usersModel");
const { setUser, getUser } = require("../service/auth");
const bcrypt = require("bcryptjs");
const maxAge = 3 * 24 * 60 * 60 * 1000;

async function handleSignup(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body.userData;
    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
      return res.status(400).send("User Already Exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newuser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const token = setUser(newuser);
    res.cookie("uid", token, {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.json({ newuser });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).send("User Not Fount, SignUp First");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Incorrect Password");
    }
    const token = setUser(user);
    res.cookie("uid", token, {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function getUserData(req, res) {
  try {
    const token = req.cookies?.uid;
    if (!token) {
      return res.status(400).send("you're not logged in");
    }
    const user = getUser(token);
    if (!user) {
      return res.status(400).send("user not authorised");
    }

    const userdetails = await User.findById(user._id);
    if (!userdetails) {
      return res.status(400).send("user not found");
    }
    return res.json({ userdetails });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { handleSignup, handleLogin, getUserData };
