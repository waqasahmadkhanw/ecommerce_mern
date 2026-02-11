import { Product } from "../../models/product.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// ✅ Get All Products
const readProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("category", "name description");

  return res.status(200).json(
    new ApiResponse(200, products, "All products fetched successfully")
  );
});

// ✅ Get Single Product by ID
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID is required");
  }

  const product = await Product.findById(id).populate("category", "name description");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(
    new ApiResponse(200, product, "Single product fetched successfully")
  );
});

export { readProducts, getSingleProduct };
