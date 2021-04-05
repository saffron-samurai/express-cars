const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const users = require("./data").users;

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Successfully connected to the server",
    timestampUTC: new Date().toUTCString()
  });
});

app.get("/users", (req, res) => {
  const limit = parseInt(req.query?.limit || 20);
  const offset = parseInt(req.query?.offset || 0);
  const usersList = users.filter(user => (user.uid >= offset && user.uid < offset + limit));

  res.status(200).send({
    count: usersList.length,
    users: usersList
  });
});

app.get("/users/:uid", (req, res) => {
  try {
    const reqUser = users.find(user => user.uid === parseInt(req.params.uid));
    console.log(reqUser);

    if (reqUser)
      res.status(200).send({
        user: reqUser
      });
    else
      res.status(404).send({
        uid,
        error: `User with uid ${uid} not found`,
        timestampUTC: new Date().toUTCString()
      });
  } catch (exception) {
    res.status(500).send({
      error: 'Something went wrong, please check your api endpoint',
      exception
    });
  }
});

app.listen(PORT, () => {
  console.log("Server started!");
});
