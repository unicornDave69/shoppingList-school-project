const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.listen(8000, () => {
  console.log("Server is running on port 8000!");
});

app.get("/", (req, res) => {
  res.send("Hello API");
});

mongoose
  .connect(
    "mongodb+srv://dejvdobrovolny642001:ONYYiC8Desbnbn7C@wtbbtwbackend.1tdce.mongodb.net/shopping_lists?retryWrites=true&w=majority&appName=WTBBTWbackend"
  )
  .connect.then(() => {
    console.log("Conected to databese.");
  })
  .catch((err) => {
    console.log(err);
  });
