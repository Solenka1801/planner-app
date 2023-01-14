const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Importing Routes
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const eventRoute = require("./routes/eventRoute");

dotenv.config();
const port = process.env.PORT || 8000;

mongoose.set("strictQuery", false);
//Connecting to mongoDB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
  },
  () => console.log("connected to mongodb")
);

//Middleware
app.use(express.json());

//Route MiddLewares
app.use("/api/v1/users", userRoute);
app.use("/api/v1/test", postRoute);
app.use("/api/v1/events", eventRoute);

app.listen(port, () => console.log("Server Up and running"));
