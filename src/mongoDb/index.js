/* eslint-disable no-console */
const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//   name: { firstName: String, lastName: String },
//   password: String,
//   dateCreating: { type: Date, default: Date.now() },
//   email: { type: String, default: "andrey.87@gmail.com" }
// });

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
const Admin = mongoose.model("admins", adminUserSchema);
// const User = mongoose.model("users", userSchema);

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
      const resp = { user, err: null };
      dbResp = resp;
      return resp;
    }
    return dbResp;
  });
  return dbResp;
};
// User.find({ name: `*` }).then(() => console.log());
module.exports.adminAuthorization = adminAuthorization;
