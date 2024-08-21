const express = require("express");
const {
  register,
  signIn,
  signOut,
  updateUser,
  deleteUser,
  changePassword,
  getUserWithPinnedToDos,
  checkToken,
} = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const cloudinaryFileUploader = require("../middleware/uploadFile");
const router = express.Router();
router.post("/register", register);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);
router.put(
  "/update",
  verifyToken,
  cloudinaryFileUploader.single("profilePicture"),
  updateUser
);
router.put("/update-password", verifyToken, changePassword);

router.delete("/delete", verifyToken, deleteUser);

router.get("/pinned-todos", verifyToken, getUserWithPinnedToDos);
module.exports = router;
