const express = require("express");

const apiRoutes = require("./routes");
const { server } = require("./config");
const { connectDB } = require("./lib/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = server.PORT || 3000;

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});
