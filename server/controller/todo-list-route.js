const ToDoList = require("../models/todo-list.models");

const createTodoList = async (req, res) => {
  const { title, description, priority, tags, taskImage } = req.body;
  const uploadTaskImage = (req.body.taskImage = req.file
    ? req.file?.path
    : null);
  if (!title) return res.status(400).json({ message: "Title is required" });
  if (!description)
    return res.status(400).json({ message: "Description is required" });
  if (title.length > 100)
    return res.status(400).json({ message: "Title is too long" });
  if (description.length > 1000)
    return res.status(400).json({ message: "Description is too long" });

  const hasTitle = await ToDoList.findOne({ title });
  if (hasTitle) {
    return res.status(400).json({ message: "Title already exists" });
  }
  try {
    const newTodoList = new ToDoList({
      title,
      description,
      priority,
      tags,
      taskImage: uploadTaskImage,
      userId: req.user.id,
    });

    await newTodoList.save();
    res.status(200).json(newTodoList);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
module.exports = { createTodoList };
