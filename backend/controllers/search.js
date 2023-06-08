const user = require("../models/user");

exports.searchUser = async (req, res) => {
  const query = req.params.query;
  try {
    if (!query) {
      return res
        .status(400)
        .send({ error: [{ msg: "Query parameter 'q' is required" }] });
    }

    const results = await user.find({
      username: { $regex: new RegExp(query, "i") },
    });

    res.status(200).send({ results });
  } catch (error) {
    res.status(500).send({ error: [{ msg: "Error searching users" }] });
  }
};
