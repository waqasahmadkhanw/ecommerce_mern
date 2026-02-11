//========================
//5️⃣ CLEAR CART
//========================
//• Empty items array

import { Cart } from "../../models/catr.model.js";
import asnycHandler from "../../utils/asyncHandler.js";

//• Reset totalPrice
export const clearCart = asnycHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, "Cart not found");

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  return res.status(200).json(new ApiResponse(200, cart, "Cart cleared"));
});
export default clearCart