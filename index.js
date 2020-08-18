const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const pdb = require("./src/Postgrees/index");
const db = require("./src/mongoDb/index");

const jsonParser = bodyParser.json();
const app = express();

// Middlewares
app.use(express.static("build"));
app.use(cors());
app.use(jsonParser);

// start server
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});

// register new user DONE
app.post("/registerUser", jsonParser, async (req, res) => {
  const dataResp = await pdb.addUser(req.body.user);
  if (dataResp.error) {
    return res.status(200).send(dataResp);
  }
  return res.status(201).send(dataResp);
});

// authorisation
app.post("/auth", jsonParser, async (req, res) => {
  const dataResp = await pdb.authorization({
    userEmail: req.body.userEmail,
    password: req.body.password
  });
  if (dataResp.error) {
    return res.status(200).send(dataResp);
  }
  return res.status(201).send(dataResp);
});

// get session user and token
app.post("/getSession", jsonParser, (req, res) => {
  return db
    .getTokenFromDb(req.body.token)
    .then(resp => {
      if (!res) {
        return res.status(200).send({ err: "No user session available" });
      }

      return res.status(200).send({ resp });
    })
    .catch(err => err);
});

// delete  session
app.post("/deleteSession", jsonParser, (req, res) => {
  return db.deleteSession(req.body.token).then(resp => {
    if (resp.ok === 1) {
      res.status(200).send({ data: "SUCCES" });
    }
  });
});

// get all users from DB
app.post("/getUsers", jsonParser, (req, res) => {
  db.getUsers(req.body.token).then(data => {
    if (data.err) {
      return res.status(200).send({ data, err: data.err });
    }
    return res.status(200).send({ users: data });
  });
});

// update user
app.post("/updateUser", jsonParser, (req, res) => {
  db.updateUser(req.body.userToupdate).then(data => res.status(200).send(data));
});
