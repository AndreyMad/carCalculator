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
  console.log("postgree connected");
});

const addUser = ({ firstName, lastName, email, phone, password }) => {
  return client
    .query(
      `INSERT INTO users(firstname, lastName,email, phone, password ) VALUES($1, $2, $3, $4, $5) returning id, email, password`,
      [firstName, lastName, email, phone, password]
    )
    .then(res => {
      return { user: { ...res.rows[0] } };
    })
    .catch(error => {
      return { error: { ...error }, user: {} };
    });
};

const authorization = ({ userEmail, userPassword }) => {
  return client
    .query(`SELECT email, password FROM users where email = '${userEmail}'`)
    .then(res => {
      console.log(!!res.rows.length);
      if (res.rows.length === 0) {
        return { error: "Користувача не знайдено", user: {} };
      }
      return { user: { ...res.rows[0] } };
    })
    .catch(error => {
      return { error: { ...error }, user: {} };
    });
};

module.exports.addUser = addUser;
module.exports.authorization = authorization;
