const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../model/UserAuth");
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User is already exist." });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).json({ message: "registration was successful" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
