const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = (opts) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan("dev"));

  const questionsRoute = require("./routes/question");
  //const registerUser = require("./routes/register");
  //const login = require("./routes/login");

  //Middleware for handling request
  app.use("/questions", questionsRoute);

  //app.use("/register", registerUser);

  //app.use("/login", login);

  //Error handler for page/route not found

  app.use((req, res, next) => {
    const error = new Error("Page Not found");
    error.status = 404;
    next(error);
  });

  //Error handler for other types of error
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  //Setting up mongoose Connection
  const db = async () => {
    await mongoose.connect(opts.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    //Get/define the default connection
    const db = mongoose.connection;

    //binding the connection to an error event so as to get connection success/error
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("database connected"));
    return db;
  };

  return {
    app,
    db,
    start: () =>
      db().then(() => {
        app.listen(opts.PORT, () => {
          console.log(`The API is listening on port ${opts.PORT}`);
        });
      }),
  };
};
