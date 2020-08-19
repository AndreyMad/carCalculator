/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.set("useFindAndModify", false);

const userSchema = mongoose.Schema({
  name: { firstName: String, lastName: String },
  password: String,
  dateCreating: { type: Date, default: Date.now() },
  email: { type: String, default: "andrey.87@gmail.com" },
  phone: String,
  allowedCarfaxRequest: String,
  carRequests: Array,
  carfaxRequests: Array,
  favoriteCars: Array
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
    users = [...res];
    return users;
  });

  return users;
};
const registerUser = async user => {
  console.log(user);
  const isUserExist = await Users.findOne({ email: user.email });
  if (isUserExist) return { user: {}, err: "User exist" };
  await Users.create(user);
  const userFromDb = await Users.findOne({ email: user.email });
  return userFromDb;
};

const updateUser = async user => {
  await Users.updateOne(
    { _id: user._id },
    { $set: { allowedCarfaxRequest: user.allowedCarfaxRequest } }
  );
  const updatedUser = await Users.findById({ _id: user._id });
  return updatedUser;
};

const setTokenToDb = (token, id, userName) => {
  Sessions.create({ sessionToken: token, userId: id, userName });
};
const getTokenFromDb = token => {
  return Sessions.findOne({ sessionToken: token }).then(res => {
    return res;
  });
};
const deleteSession = token => {
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
const userAuthorization = async (email, password) => {
  let dbResp = {};
  console.log(email);
  await Users.findOne({ email }).then(user => {
    if (!user) {
      const resp = { user: {}, err: "Користувач не існує" };
      dbResp = resp;
      return resp;
    }
    if (user.password !== password) {
      const resp = { user: {}, err: "Невірний пароль" };
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
module.exports.deleteSession = deleteSession;
module.exports.updateUser = updateUser;
module.exports.userAuthorization = userAuthorization;
module.exports.registerUser = registerUser;
