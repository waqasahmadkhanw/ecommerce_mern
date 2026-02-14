export const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId } = req.body;

  const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

  return res.status(200).json(
    new ApiResponse(200, paymentIntent, "Payment confirmed")
  );
});
