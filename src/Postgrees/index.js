/* eslint-disable no-console */
const { Client } = require("pg");

const client = new Client({
  host: "dumbo.db.elephantsql.com",
  port: 5432,
  user: "xjqyfann",
  password: "MjJJt1VnysEEFCqb_oSLEqh6EINXDBMT"
});

const addUser = (firstname, lastName, email, phone, password) => {
  client.connect(err => {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    return client.query(
      `INSERT INTO users(firstname, lastName,email, phone, password ) VALUES($1, $2, $3, $4, $5)`,
      [firstname, lastName, email, phone, password],
      (error, result) => {
        if (err) {
          return console.error("error running query", error);
        }
        client.end();
        return result;
      }
    );
  });
};

addUser("bob", "singer", "bobi@bob", "90711684", "12334");
// addUser(query);

// const getUsers = () => {
//   client.connect(function(err) {
//     if (err) {
//       return console.error("could not connect to postgres", err);
//     }
//     client.query("select * from users", (err, result) => {
//       if (err) {
//         return console.error("error running query", err);
//       }
//       console.log(result);
//       client.end();
//       return result;
//     });
//   });
// };
// getUsers();
// addUser(query);
