/* eslint-disable no-console */
const { Client } = require("pg");

const client = new Client({
  host: "dumbo.db.elephantsql.com",
  port: 5432,
  user: "xjqyfann",
  password: "MjJJt1VnysEEFCqb_oSLEqh6EINXDBMT"
});

client.connect(err => {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  return console.log("postgres connected");
});

const addUser = ({ firstName, lastName, password, email, phone }) => {
  client.query(
    `INSERT INTO users(firstname, lastname, email, phone, password ) VALUES($1, $2, $3, $4, $5)`,
    [firstName, lastName, email, +phone, password],
    (error, res) => {
      if (error) {
        return console.error("error running query", error);
      }
      client.end();
      return res;
    }
  );
};

const getUsers = () => {
  client.connect(err => {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    return client.query("select * from users", (error, result) => {
      if (error) {
        return console.error("error running query", error);
      }
      // console.log(result);
      return result;
    });
  });
  client.end();
};

module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
