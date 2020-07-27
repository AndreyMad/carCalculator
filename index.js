const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

const uri =
  "mongodb+srv://andrey:598741@cluster0.c5cyn.gcp.mongodb.net/AdminUsers?retryWrites=true&w=majority";
app.use(express.static("build"));

mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("mongoose connected"))
  .catch(err => console.log(err));

app.use(express.static("build"));
app.use(cors());

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  dateCreating: { type: Date, default: Date.now() }
});

const User = mongoose.model("User", userSchema);

app.post("/auth", (req, res) => {

  console.log(req.body);
 
  res.sendStatus(200);
  res.send(req.body);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});
