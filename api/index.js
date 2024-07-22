const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const hotelsRoutes = require("./routes/hotels");
const roomsRoutes = require("./routes/rooms");
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to database");
  } catch (err) {
    throw err;
  }
};

// mongoose.connection.on("disconnected", () => {
//   console.log("MongoDB disconnected");
// });

// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected");
// });

//middlewares

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Server started at port 8000");
});
