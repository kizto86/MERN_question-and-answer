const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = (opts) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan("dev"));

  //use session for tracking login
  /**
   * @argument secret is a string used to sign the session id cookie. It added another level of security 
   * @argument forces forces the session to be saved in the session store whether anything change during the request or not.
     @argument  saveUninitialized:forces an uninitialized session to be saved in the session store, setting it to false means
                that a new session which has not been modified will not be saved.
   */
  /*app.use(
    session({
      secret: "Roses are red",
      resave: true,
      saveUninitialized: false,
    })
  );*/

  const questionsRoute = require("./routes/question");
  //const register = require("./routes/register");

  //Middleware for handling request
  app.use("/questions", questionsRoute);

  //app.use("/register", register);

  //app.use("/login", register);

  //Error handler for page/route not found

  /*app.use((req, res, next) => {
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
  });*/

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

  //Serve static asserts in production
  if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

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
