const catchError = require("../utils/catchError");
const checkItems = require("../utils/checkItems");
const { FRONTEND_URL,STRIPE_SECRET_KEY } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY ||"sk_test_tR3PYbcVNZZ796tH88S4VQ2u");

const checkout = catchError(async (req, res) => {
  const { productArray: items } = await checkItems(req.body.orderItems);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "inr",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
        },
      },
      quantity: item.qty || 1,
    })),
    mode: "payment",
    success_url: FRONTEND_URL,
    cancel_url: FRONTEND_URL,
  });
  res.status(200).json({redirect :session.url});
});

module.exports = { checkout };
