const express = require("express");
<<<<<<< HEAD

const app = express();

const port = process.env.port || 8000;

app.use(express.static("build"));

app.get("/*", (req, res) => {
  res.send(__dirname, "build", "index.html");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
=======
const path = require("path");

const app = express();

app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
>>>>>>> newdesign
});
