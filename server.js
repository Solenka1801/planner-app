const dotenv = require('dotenv');
const app = require('./index');
const mongoose = require("mongoose");

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


// connecting to DB
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("successfully connected to mongodb")
);
//mongoose.connect()