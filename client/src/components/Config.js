const inDevelopment = process.env.NODE_ENV === "development";

const inProduction = process.env.NODE_ENV === "production";

exports.baseUrl =
  inDevelopment || inProduction
    ? `http://localhost:5000/questions/`
    : "https://obscure-inlet-42322.herokuapp.com/questions/";
