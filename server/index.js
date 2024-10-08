const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.route");
const toDoList = require("./routes/todo-list.route");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "task-manager",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/user", userRoute);
app.use("/api/to-do-list", toDoList);
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
