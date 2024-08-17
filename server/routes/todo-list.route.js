const express = require("express");
const { createTodoList } = require("../controller/todo-list-route");
const verifyToken = require("../middleware/verifyToken");
const cloudinaryFileUploader = require("../middleware/uploadFile");
const router = express.Router();
router.post(
  "/",
  verifyToken,
  cloudinaryFileUploader.single("taskImage"),
  createTodoList
);
module.exports = router;
