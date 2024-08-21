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
        "https://www.wikihow.com/images/thumb/3/38/Make-a-To-Do-List-Step-5-Version-3.jpg/v4-460px-Make-a-To-Do-List-Step-5-Version-3.jpg.webp",
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
    isPin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const ToDoList = mongoose.model("ToDoList", toDoListSchema);
module.exports = ToDoList;
