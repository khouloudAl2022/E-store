const express = require("express");
const {
  userRegister,
  getoneUser,
  deleteUsers,
  updateUsers,
  getUsers,
  login,
} = require("../controllers/user");
const { Auth } = require("../middleware/Auth");
const { Admin } = require("../middleware/Admin");

const {
  RegisterValidation,
  LoginValidation,
  Validation,
} = require("../middleware/Validation");
const { searchUser } = require("../controllers/search");
const userRoutes = express.Router();

userRoutes.post("/register", RegisterValidation, Validation, userRegister);

userRoutes.post("/login", LoginValidation, Validation, login);
// middleware check token
userRoutes.get("/current", Auth, (req, res) => {
  res.send({ user: req.user });
});

//******************** */
userRoutes.get("/getusers", getUsers);

userRoutes.delete("/delete/:id", deleteUsers);

userRoutes.put("/update/:id", updateUsers);

userRoutes.get("/getoneuser/:name", getoneUser);

userRoutes.get("/search/:query", searchUser);

module.exports = userRoutes;
