const { findOne } = require("../models/user");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await user.findOne({ email: email });
    if (found) {
      return res.status(400).send({ errors: [{ msg: "user already exist" }] });
    }
    const newUser = new user(req.body);
    //bcrypt
    salt = 10;
    const hashpassword = bcrypt.hashSync(password, salt);
    newUser.password = hashpassword;
    const payload = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY);

    await newUser.save();
    res.status(200).send({ msg: "user added successfully", newUser, token });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "could not add user" }] });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const founduser = await user.findOne({ email: email });

    if (!founduser) {
      return res.status(400).send({
        errors: [{ msg: "Please check your email and password and try again" }],
      });
    }
    const match = await bcrypt.compareSync(password, founduser.password);

    if (!match) {
      return res.status(400).send({
        errors: [{ msg: "Please check your email and password and try again" }],
      });
    }
    const payload = {
      id: founduser._id,
      isAdmin: founduser.isAdmin,
      email: founduser.email,
      name: founduser.name,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY);
    res.status(200).send({ msg: "user login successfully", founduser, token });
  } catch (error) {
    res
      .status(500)
      .send({ errors: [{ msg: "server error . Please try again later " }] });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).send({ msg: "get users success", users });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not get users " }] });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const deleteuser = await user.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "user deleted", deleteuser });
  } catch (error) {
    res.status(500).send("User could not deleted");
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const updateuser = await user.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    // console.log(req.body);
    res.status(200).send({ msg: "user updated", updateuser });
  } catch (error) {
    res.status(500).send({
      errors: [
        {
          msg: "Oops, something went wrong and we were unable to update your information  ",
        },
      ],
    });
  }
};

exports.getoneUser = async (req, res) => {
  try {
    const getoneuser = await user.findOne({ name: req.params.name });
    console.log(getoneuser);
    res.status(200).send({ msg: "user finded by name", getoneuser });
  } catch (error) {
    res.status(500).send({
      errors: [
        {
          msg: "Sorry, we could not retrieve the information for the requested user",
        },
      ],
    });
  }
};
