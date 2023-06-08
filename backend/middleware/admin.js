exports.Admin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("Access regicted");
    }

    next();
  } catch (error) {
    console.log("servr errrrrror");
  }
};
