require("./env"); // load env first

module.exports = {
  server: require("./server.config"),
  database: require("./database.config"),
  auth: require("./auth.config"),
};
