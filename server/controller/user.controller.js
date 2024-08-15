const User = require("../models/user.models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ message: "Please enter your username", success: false });

  if (!password)
    return res
      .status(400)
      .json({ message: "Please enter your password", success: false });
  if (!email)
    return res
      .status(400)
      .json({ message: "Please enter your email", success: false });
  const hasUser = await User.findOne({ email });
  if (hasUser)
    return res
      .status(400)
      .json({ message: "User already exists", success: false });

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    return res.status(200).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ message: "Please enter your email", success: false });
  if (!password)
    return res
      .status(400)
      .json({ message: "Please enter your password", success: false });
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ message: "User does not exist", success: false });
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch)
    return res
      .status(400)
      .json({ message: "Invalid credentials", success: false });
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000);
    const { password: hashedPassword, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
const signOut = async (req, res) => {
  try {
    res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ message: "Logout success" });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.user;
  if (!id)
    return res
      .status(400)
      .json({ message: "User does not exist", success: false });
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
      },
    });
    res
      .status(200)
      .json({ message: "User updated successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
module.exports = { register, signIn, signOut, updateUser };
