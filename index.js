// importing modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// connecting to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("successfully connected to mongodb")
);

// importing routes
const authRoutes = require("./routes/auth");
const plannerRoutes = require("./routes/planner");
const verifyToken = require("./routes/validate-token");

// middlewares
app.use(express.json()); //usedd for body parser

// route middlewares
app.use("/api/user", authRoutes);
app.use("/api/planner", verifyToken, plannerRoutes);

app.listen(3000, () => console.log("server running!🏁"));
