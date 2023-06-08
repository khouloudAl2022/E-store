const express = require("express");
const {
  RegisterProduct,
  UpdateProduct,
  GetAllProduct,
  DeleteProduct,
  GetoneProduct,
} = require("../controllers/product");
const { upload } = require("../middleware/upload");
const productRoutes = express.Router();

productRoutes.post("/add", upload.single("image"), RegisterProduct);

productRoutes.put("/updateproduct/:id", upload.single("image"), UpdateProduct);

productRoutes.get("/getproducts", GetAllProduct);

productRoutes.delete("/deleteproduct/:id", DeleteProduct);

productRoutes.get("/getoneproduct", GetoneProduct);

module.exports = productRoutes;
