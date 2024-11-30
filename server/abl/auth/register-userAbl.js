const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../model/UserAuth");
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;
