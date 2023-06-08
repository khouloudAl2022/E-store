const product = require("../models/product");

exports.RegisterProduct = async (req, res) => {
  console.log(req.file);

  try {
    const newProduct = new product({ ...req.body, image: req.file.filename });
    await newProduct.save();
    console.log(req.body);
    res.status(200).send({ msg: "Product added successfully", newProduct });
  } catch (error) {
    res.status(500).send({ msg: "Product could not added" });
  }
};
exports.UpdateProduct = async (req, res) => {
  try {
    const updateProduct = await product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res
      .status(200)
      .send({ msg: "Product updated successfully", updateProduct });
  } catch (error) {
    res.status(500).send({
      errors: [
        {
          msg: "Oops, something went wrong and we were unable to update your product information  ",
        },
      ],
    });
  }
};
exports.GetAllProduct = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).send({ msg: "Get all products succeeded", products });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Could not get products " }] });
  }
};

exports.DeleteProduct = async (req, res) => {
  try {
    const deleteproduct = await product.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "user deleted", deleteproduct });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "user could not deleted" }] });
  }
};

exports.GetoneProduct = async (req, res) => {
  try {
    const getoneproduct = await user.findOne({ name: req.params.name });
    console.log(getoneuser);
    res.status(200).send({ msg: "user finded by name", getoneproduct });
  } catch (error) {
    res.status(500).send({
      errors: [
        {
          msg: "Sorry, we could not retrieve the information for the requested product",
        },
      ],
    });
  }
};
