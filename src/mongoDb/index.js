/* eslint-disable no-console */
const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//   name: String,
//   password: String,
//   dateCreating: { type: Date, default: Date.now() },
//   email: String
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
const Admin = mongoose.model("Admins", adminUserSchema);
// const User = mongoose.model("users", userSchema);

const adminAuthorization = (userName, password) => {
  Admin.findById(`5f18b42277556706dcbdea59`).then(res => console.log(res));
  Admin.findOne({ name: userName }).then(user => {
    console.log(user);
    if (!user || user.password !== password) {
      console.log(`Admin not fousnd`);
      return `Admin not found`;
    }
    if (user.password === password) {
      return user;
    }
    return null;
  });
};
// User.find({ name: `*` }).then(() => console.log());
module.exports.adminAuthorization = adminAuthorization;
