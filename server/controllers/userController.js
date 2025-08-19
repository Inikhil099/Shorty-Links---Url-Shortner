const { SendVerificationEmail } = require("../mailtrap/mail");
const User = require("../models/usersModel");
const { setUser, getUser } = require("../service/auth");
const bcrypt = require("bcryptjs");
const maxAge = 3 * 24 * 60 * 60 * 1000;

async function handleSignup(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body.userData;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User Already Exist");
    }
    console.log("user not found")
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newuser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const token = setUser(newuser);
    console.log(token)
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
    const userdetails = await User.findById(req.user._id);
    if (!userdetails) {
      return res.status(400).send("user not found");
    }
    console.log("user data successfull")
    return res.json({ userdetails });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}





// these controllers are for email verification

async function EmailNotVerifed(req, res) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(400).send("user not found");
    }
    if (user.isVerified) {
      return res.status(200).redirect("http://localhost:5173");
    }

    const TEN_MINUTES = 10 * 60 * 1000;
    if (new Date() - new Date(user.tokenExpiresAt) < 10 * 60 * 1000) {
      return res.status(400).render("emailverificationpage", {
        msg: "Check Your Mail Verification OTP is Still Valid",
      });
    }
    const OTP = Math.floor(1000 + Math.random() * 9000);
    // await SendVerificationEmail(user.email, OTP);

    const update = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: OTP, tokenExpiresAt: new Date() },
      { new: true }
    );
    return res.render("emailverificationpage");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function VerifyEmailOTP(req, res) {
  try {
    const { otp } = req.body;
    console.log(otp)
    const TestOTP = 1234
    if (!otp) {
      return res.status(400).send("Verification OTP is Requred");
    }
    const user = await User.findOne({ email: req.user.email });

    
    // if (user.token != otp) {
    //   return res.status(400).render("emailverificationpage",{
    //     errmsg:"Wrong Verification OTP"
    //   })
    // }


    // testing the otp without mailtap
    if (otp != TestOTP) {
      return res.status(400).render("emailverificationpage",{
        errmsg:"Wrong Verification OTP"
      })
    }



    // this one is for when using the mailtrap paid service

    const update = await User.findOneAndUpdate(  
      { email: req.user.email },
      { isVerified: true, tokenExpiresAt: "compeleted", token: null },
      { new: true }
    );
    return res.status(200).redirect("http://localhost:5173");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleSignup,
  handleLogin,
  getUserData,
  EmailNotVerifed,
  VerifyEmailOTP,
};
