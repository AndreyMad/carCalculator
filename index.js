const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./src/mongoDb/index");

const jsonParser = bodyParser.json();
const app = express();

// Middlewares
app.use(express.static("build"));
app.use(cors());
app.use(jsonParser);

// admin authorisation
app.post("/auth", jsonParser, (req, res) => {
  db.adminAuthorization(req.body.userName, req.body.password).then(data => {
    if (data.err) {
      return res.status(200).send({ data, err: data.err });
    }
    return res.status(200).send({ ...data });
  });
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

// delete admin session
app.post("/deleteAdmSession", jsonParser, (req, res) => {
  return db.deleteAdminSession(req.body.token).then(resp => {
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
  db.updateUser(req.body.userToupdate).then(data => data);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});
