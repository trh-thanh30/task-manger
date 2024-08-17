const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk5vCU8ufYriBkY4l8m2WefABD2zkRkB8HZw&s",
    },
    listOfToDo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToDoList",
      },
    ],
    listOfToDoHasPin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToDoList",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
