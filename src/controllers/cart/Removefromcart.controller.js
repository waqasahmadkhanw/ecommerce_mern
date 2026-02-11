//steps

import { Cart } from "../../models/catr.model.js";
import asnycHandler from "../../utils/asyncHandler.js";

export const removeCartItem = asnycHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, "Cart not found");

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  await cart.save();

  return res.status(200).json(new ApiResponse(200, cart, "Item removed from cart"));
});
export default removeCartItem