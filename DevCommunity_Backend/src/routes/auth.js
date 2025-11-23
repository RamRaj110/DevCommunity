const express = require("express");
const authRouter = express.Router();
const { userValidation } = require("../utils/userValidation");
const bcrypt = require("bcrypt");
const User = require("../modules/user");

authRouter.post("/signup", async (req, res) => {
  try {
    userValidation(req);
    const {
      firstName,
      lastName,
      email,
      gender,
      password,
      skills,
      about,
      profileImg,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      gender,
      password: hashPassword,
      skills,
      about,
      profileImg,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User created successfully.", user: savedUser });
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credentials...");
    } else {
      const isMatch = await user.validatePasswrd(password);
      if (!isMatch) {
        throw new Error("Invalid Credentials...");
      } else {
        const token = await user.getJWT();

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          expires: new Date(Date.now() + 8 * 3600000),
        });
        res.json({ user });
      }
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.send("user logout successfully...");
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

module.exports = authRouter;
