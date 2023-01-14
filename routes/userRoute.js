const router = require("express").Router();
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

//SIGNUP USERS
router.post("/signUp", async (req, res) => {
  //validate the data before we make an user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //password is correct or incorrect
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).send("Password confirmation doesnt match password");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create an user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    city: req.body.city,
    country: req.body.country,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//SIGNIN USERS
router.post("/signIn", async (req, res) => {
  //validate the data before we make an user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Checking if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");
  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("invalid password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
