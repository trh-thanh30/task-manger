const mongoose = require("mongoose");
const toDoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Extreme", "Moderate", "Low"],
    },
    taskImage: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqcjIMGf5x7g5DlCFLVLdxc6dz5YBKoZJ_4Q&s",
    },
    tags: [
      {
        type: String,
      },
    ],
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ToDoList = mongoose.model("ToDoList", toDoListSchema);
module.exports = ToDoList;
