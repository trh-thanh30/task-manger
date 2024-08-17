const express = require("express");
const {
  createTodoList,
  updateToDoList,
  getToDoListByUserId,
  deleteToDoList,
  getToDoListById,
} = require("../controller/todo-list-controller");
const verifyToken = require("../middleware/verifyToken");
const cloudinaryFileUploader = require("../middleware/uploadFile");
const router = express.Router();

router.get("/", verifyToken, getToDoListByUserId);
router.post(
  "/",
  verifyToken,
  cloudinaryFileUploader.single("taskImage"),
  createTodoList
);
router.put(
  "/:id",
  verifyToken,
  cloudinaryFileUploader.single("taskImage"),
  updateToDoList
);
router.get("/:id", verifyToken, getToDoListById);
router.delete("/:id", verifyToken, deleteToDoList);
module.exports = router;
