const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

const questionsRoute = require("./routes/question");

//Middleware for handling request
app.use("/api/questions", questionsRoute);

//Setting up mongoose Connection

mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Get/define the default connection
const db = mongoose.connection;

//binding the connection to an error event so as to get connection success/error
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("database connected"));

//Serve static asserts if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The API is listening on port ${port}`);
});
