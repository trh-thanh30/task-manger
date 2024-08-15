const express = require("express");
const {
  register,
  signIn,
  signOut,
  updateUser,
} = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.post("/register", register);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);
router.put("/update", verifyToken, updateUser);

module.exports = router;
