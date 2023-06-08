const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.Auth = async (req, res, next) => {
  const token = req.header("authentication");
  try {
    if (!token) {
      return res.status(400).send("you are not authorised");
    }
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findById(decoded.id);

    req.user = user;
    // console.log(req.user);
    next();
  } catch (error) {
    console.log("servr errrrrror");
  }
};
