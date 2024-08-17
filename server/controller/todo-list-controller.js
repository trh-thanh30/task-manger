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
const getToDoListByUserId = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { tags: { $regex: search, $options: "i" } },
        ],
      };
    }
    const totalEmployment = await ToDoList.countDocuments(searchQuery);
    const todoLists = await ToDoList.find({
      userId: req.user.id,
      ...searchQuery,
    })
      .limit(limit)
      .skip(skip)
      .sort({ updateAt: -1 });
    const totalPages = Math.ceil(totalEmployment / limit);
    res.status(200).json({
      message: "All to do list fetched successfully",
      success: true,
      data: {
        data: todoLists,
        pagination: {
          totalPages,
          totalEmployment,
          currentPage: page,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
const updateToDoList = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, tags } = req.body;
  if (!id)
    return res.status(404).json({ message: "Id not found", success: false });
  try {
    let update = { title, description, priority, tags };
    if (req.file) {
      update.taskImage = req.file?.path;
    }
    const updateToDoList = await ToDoList.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.status(200).json(updateToDoList);
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};
const deleteToDoList = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(404).json({ message: "Id not found", success: false });
  try {
    const deleteToDoList = await ToDoList.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully", success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
const getToDoListById = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(404).json({ message: "Id not found", success: false });
  try {
    const getToDoListId = await ToDoList.findById(id);
    res.status(200).json(getToDoListId);
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
module.exports = {
  createTodoList,
  updateToDoList,
  getToDoListByUserId,
  deleteToDoList,
  getToDoListById,
};
