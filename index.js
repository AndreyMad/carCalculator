const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const db = require("./src/mongoDb/index");

const jsonParser = bodyParser.json();
const app = express();

// Middlewares
app.use(express.static("build"));
app.use(cors());
app.use(jsonParser);
app.post("/auth", jsonParser, (req, res) => {
  db.adminAuthorization(req.body.userName, req.body.password).then(data => {
    if (data.err) {
      return res.status(200).send({ err: data.err });
    }
    const token = jwt.sign({ password: req.body.password }, "crazy_cat");
    return res.status(200).send({ data, token });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});
