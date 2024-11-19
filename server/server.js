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
    "mongodb+srv://daviddobrovolny10:PCqdrMsmGKMhujNG@wtbbtw.qvtnx.mongodb.net/?retryWrites=true&w=majority&appName=wtbbtw"
  )
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });
