const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const Users = require("./db/userModel");
const jwt = require("jsonwebtoken");
const auth = require("./middlewares/auth"); 

require("./db/dbconfig");

const app = express();
app.use(express.json());
app.use(cors());
const jwt_secret = "cfmklverjgiojvdfer487fjf478rfjklo";
app.post("/register", async (req, res) => {
  try {
    const userExist = await Users.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).send("User Already Exists");
    }
    const bycryptedPassword = await bcryptjs.hash(req.body.password, 10);
    const newUser = new Users({
      username: req.body.username,
      password: bycryptedPassword,
      email: req.body.email,
    });
    const result = await newUser.save();
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log(req,"it is herer")
    try {
      const userExist = await Users.findOne({ email: email });
      // console.log(userExist,"userExist")
      if (!userExist) {
        return res.send({ status: "User Not Found" });
      }
      const passwordIsTrue = await bcryptjs.compare(password, userExist.password); // Use await here
      if (passwordIsTrue) {
        const token = jwt.sign({email:userExist.email,_id:userExist._id}, jwt_secret);
        console.log(token,"Token")
        if (res.status(200)) {
          return res.json({ status: "ok", data: token });
        } else {
          return res.json({ error: "error", data: token });
        }
      }
      res.json({ status: "error", error: "Invalid Password" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  });
  

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
