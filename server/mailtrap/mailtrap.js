const { MailtrapClient } = require("mailtrap");

const TOKEN = "c3f11b87995706233aa71b44eafedb24";

const mailClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "ShortyLinks",
};
const recipients = [
  {
    email: "youemail@gmail.com",
  }
];

module.exports = {mailClient ,sender}