const { body, validationResult } = require("express-validator");

exports.RegisterValidation = [
  body("name", "must be valid"),
  body("email", "please add a valid email").isEmail(),
  body("password", "password must be at least 6 chars long").isLength({
    min: 6,
  }),
];
exports.LoginValidation = [
  body("email", "please add a valid email").isEmail(),
  body("password", "password must be at least 6 chars long").isLength({
    min: 6,
  }),
];
exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
