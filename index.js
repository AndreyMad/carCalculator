const express = require("express");

const app = express();

const port = process.env.port || 8000;

app.use(express.static("build"));

app.get("/*", (req, res) => {
  res.send(__dirname, "build", "index.html");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
