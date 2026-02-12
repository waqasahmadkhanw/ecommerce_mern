// import { Cart } from "../../models/cart.model.js";
// import { Product } from "../../models/product.model.js";
// import ApiError from "../../utils/ApiError.js";
// import ApiResponse from "../../utils/ApiResponse.js";
// import asyncHandler from "../../utils/asyncHandler.js";

// /*
// ========================
// 1️⃣ GET USER CART
// ========================
// • Find cart by logged-in user
// • Populate product details
// */
// export const getCart = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   const cart = await Cart.findOne({ user: userId }).populate("items.product", "name price image");

//   if (!cart) {
//     return res.status(200).json(new ApiResponse(200, { items: [], totalPrice: 0 }, "Cart is empty"));
//   }

//   return res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully"));
// });


// /*
// ========================
// 2️⃣ ADD ITEM TO CART
// ========================
// Steps:
// • Get productId + quantity from req.body
// • Validate
// • Find product
// • Get user's cart (or create one)
// • If product exists → increase quantity
// • Else → push new item
// • Recalculate totalPrice
// */
// export const addToCart = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const { productId, quantity = 1 } = req.body;

//   if (!productId || quantity < 1) {
//     throw new ApiError(400, "Product and quantity are required");
//   }

//   const product = await Product.findById(productId);
//   if (!product) throw new ApiError(404, "Product not found");

//   let cart = await Cart.findOne({ user: userId });

//   if (!cart) {
//     cart = await Cart.create({
//       user: userId,
//       items: [],
//       totalPrice: 0
//     });
//   }

//   const itemIndex = cart.items.findIndex(
//     item => item.product.toString() === productId
//   );

//   if (itemIndex > -1) {
//     cart.items[itemIndex].quantity += quantity;
//   } else {
//     cart.items.push({
//       product: product._id,
//       quantity,
//       price: product.price // snapshot
//     });
//   }

//   // Recalculate total
//   cart.totalPrice = cart.items.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );

//   await cart.save();

//   return res.status(200).json(new ApiResponse(200, cart, "Item added to cart"));
// });


// /*
// ========================
// 3️⃣ UPDATE ITEM QTY
// ========================
// • Get productId + new quantity
// • Validate
// • Update quantity
// • Recalculate total
// */
// export const updateCartItem = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const { productId, quantity } = req.body;

//   if (!productId || quantity < 1) {
//     throw new ApiError(400, "Product and valid quantity required");
//   }

//   const cart = await Cart.findOne({ user: userId });
//   if (!cart) throw new ApiError(404, "Cart not found");

//   const item = cart.items.find(
//     item => item.product.toString() === productId
//   );

//   if (!item) throw new ApiError(404, "Product not in cart");

//   item.quantity = quantity;

//   cart.totalPrice = cart.items.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );

//   await cart.save();

//   return res.status(200).json(new ApiResponse(200, cart, "Cart updated"));
// });


// /*
// ========================
// 4️⃣ REMOVE ITEM
// ========================
// • Remove item using $pull
// • Recalculate total
// */
// export const removeCartItem = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const { productId } = req.params;

//   const cart = await Cart.findOne({ user: userId });
//   if (!cart) throw new ApiError(404, "Cart not found");

//   cart.items = cart.items.filter(
//     item => item.product.toString() !== productId
//   );

//   cart.totalPrice = cart.items.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );

//   await cart.save();

//   return res.status(200).json(new ApiResponse(200, cart, "Item removed from cart"));
// });


// /*
// ========================
// 5️⃣ CLEAR CART
// ========================
// • Empty items array
// • Reset totalPrice
// */
// export const clearCart = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   const cart = await Cart.findOne({ user: userId });
//   if (!cart) throw new ApiError(404, "Cart not found");

//   cart.items = [];
//   cart.totalPrice = 0;

//   await cart.save();

//   return res.status(200).json(new ApiResponse(200, cart, "Cart cleared"));
// });
// 1️⃣ Get Cart
// 2️⃣ Add Item to Cart
// 3️⃣ Update Item Quantity
// 4️⃣ Remove Item
// 5️⃣ Clear Cart
// Excellent question, Waqas 👏
// This is the exact line that confuses many developers:

// cart.items[itemIndex].quantity += quantity;


// Let’s break everything step-by-step so you understand what [itemIndex] is, why we use it, and how it works in memory.

// 🧠 Big Picture First

// Your cart has this structure in memory:

// cart = {
//   user: "userId",
//   items: [
//     { product: "p1", quantity: 2, price: 100 },
//     { product: "p2", quantity: 1, price: 200 }
//   ],
//   totalPrice: 400
// }


// 👉 cart.items is an array
// 👉 Each element is an object (cart item)

// 🔍 Step 1 — Find if product already exists
// const itemIndex = cart.items.findIndex(
//   item => item.product.toString() === productId
// );

// What this does:

// • It loops through cart.items
// • Checks each item.product
// • If it matches the productId being added → return its index
// • If not found → returns -1

// Example:

// If cart is:

// cart.items = [
//   { product: "abc", quantity: 2 },
//   { product: "xyz", quantity: 1 }
// ]


// And productId = "abc"

// Then:

// itemIndex = 0


// If product not found → itemIndex = -1

// 🔢 Step 2 — Why [itemIndex]?

// Because cart.items is an array
// Arrays are accessed like this:

// cart.items[0]   // first item
// cart.items[1]   // second item


// So when you do:

// cart.items[itemIndex]


// You are saying:

// 👉 “Give me the cart item at position itemIndex”

// 🔁 Step 3 — If product exists → update quantity
// if (itemIndex > -1) {
//   cart.items[itemIndex].quantity += quantity;
// }

// Meaning in English:

// • If product already exists in cart
// • Go to that exact item in the array
// • Increase its quantity

// Example:

// Before:

// cart.items[0].quantity = 2
// quantity = 3


// After:

// cart.items[0].quantity = 5

// 🧺 Step 4 — If product NOT in cart → push new item
// else {
//   cart.items.push({
//     product: product._id,
//     quantity,
//     price: product.price
//   });
// }


// This adds a new object to the items array.

// 💡 Why This Pattern is Used in Production

// ✔ Prevents duplicate products
// ✔ Keeps cart clean
// ✔ Supports quantity update
// ✔ Fast lookup using array index

// 🧠 Visual Summary
// Code	Meaning
// findIndex()	Find product position in cart
// itemIndex	Index number (0,1,2…)
// cart.items[itemIndex]	Access that cart item
// .quantity += quantity	Increase quantity
// 🔚 Final Mentor Tip

// We use [itemIndex] because:

// 👉 Arrays are index-based
// 👉 We need the exact object in the array
// 👉 So we can modify it safely