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
  const { username, email } = req.body;
  if (!id)
    return res
      .status(400)
      .json({ message: "User does not exist", success: false });
  if (email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email already in use by another user",
        success: false,
      });
    }
  }
  try {
    let updatedUserData = { username, email };
    if (req.file) {
      updatedUserData.profilePicture = req.file?.path;
    }
    const user = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const changePassword = async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;
  if (!id) {
    return res
      .status(404)
      .json({ message: "User does not exist", success: false });
  }
  try {
    const user = await User.findById(id);
    const isMatch = bcryptjs.compareSync(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Old password is incorrect", success: false });
    }

    // Hash the new password
    const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);
    // Update the user's password
    await User.findByIdAndUpdate(
      id,
      { password: hashedNewPassword },
      { new: true }
    );

    res.status(200).json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.user;
  if (!id)
    return res
      .status(400)
      .json({ message: "User does not exist", success: false });
  try {
    const user = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "User deleted successfully", success: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const getUserWithPinnedToDos = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("listOfToDoHasPin");
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    return res.status(200).json({ data: user.listOfToDoHasPin, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  register,
  signIn,
  signOut,
  updateUser,
  deleteUser,
  changePassword,
  getUserWithPinnedToDos,
};
