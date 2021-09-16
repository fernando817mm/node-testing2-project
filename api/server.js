const express = require("express");
const server = express();
const User = require("./users/users-model");

server.use(express.json());

server.get("/", (req, res) => {
  res.json("sanity test");
});

server.post("/users", (req, res) => {
  req.body.username
    ? User.insert(req.body)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(500).json({
            custom: "there was an err",
            error: err.message,
          });
        })
    : res.status(422).json({ message: "please provide a name" });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  User.remove(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        custom: "user couldn't be deleted",
        error: err.message,
      });
    });
});

module.exports = server;
