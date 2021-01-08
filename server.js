require("dotenv").config();

const appOptions = {
  MONGO_URI: process.env.DB_CONNECTION,
  PORT: process.env.PORT || 5000,
};

const App = require("./app")(appOptions);

App.start();
