/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: { firstName: String, lastName: String },
  password: String,
  dateCreating: { type: Date, default: Date.now() },
  email: { type: String, default: "andrey.87@gmail.com" }
});

const Uri =
  "mongodb+srv://andrey:598741@cluster0.c5cyn.gcp.mongodb.net/usersDB?retryWrites=true&w=majority";

mongoose
  .connect(Uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("conected"))
  .catch(err => console.log(err));

const adminUserSchema = mongoose.Schema({
  name: String,
  password: String,
  dateCreating: { type: Date, default: Date.now() }
});
const sessionSchemas = mongoose.Schema({
  sessionToken: String,
  userId: String,
  userName: String
});
const Admin = mongoose.model("admins", adminUserSchema);
const Users = mongoose.model("users", userSchema);
const Sessions = mongoose.model("sessions", sessionSchemas);

const getUsers = async () => {
  let users = [];
  await Users.find().then(res => {
    // console.log(res);
    users = [...res];
    // console.log(users);
    return users;
  });

  return users;
};
const setTokenToDb = (token, id, userName) => {
  Sessions.create({ sessionToken: token, userId: id, userName });
};
const getTokenFromDb = token => {
  return Sessions.findOne({ sessionToken: token }).then(res => {
    return res;
  });
};
const deleteAdminSession = token => {
  return Sessions.deleteOne({ sessionToken: token }).then(res => {
    return res;
  });
};
const adminAuthorization = async (userName, password) => {
  let dbResp = {};

  await Admin.findOne({ name: userName }).then(user => {
    if (!user) {
      const resp = { user: {}, err: "Admin not fousnd" };
      dbResp = resp;
      return resp;
    }
    if (user.password !== password) {
      const resp = { user: {}, err: "Wrong password" };
      dbResp = resp;
      return resp;
    }
    if (user.password === password) {
      const token = jwt.sign({ password }, "crazy_cat");
      setTokenToDb(token, user._id, user.name);
      console.log("saved");
      const resp = { user, err: null, token };
      dbResp = resp;
      return resp;
    }
    return dbResp;
  });
  return dbResp;
};

module.exports.adminAuthorization = adminAuthorization;
module.exports.getUsers = getUsers;
module.exports.getTokenFromDb = getTokenFromDb;
module.exports.deleteAdminSession = deleteAdminSession;
