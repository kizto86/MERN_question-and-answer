//const inDevelopment = process.env.NODE_ENV === "development";

//const inProduction = process.env.NODE_ENV === "production";

const dev = {
  url: `http://localhost:5000/questions/`,
};

const prod = {
  url: "https://obscure-inlet-42322.herokuapp.com/questions/",
};
exports.baseUrl = process.env.NODE_ENV === "development" ? dev : prod;

//connectionString: isProduction ? process.env.DATABASE_URL : connectionString
