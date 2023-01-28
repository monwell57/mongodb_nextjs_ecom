import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handleCheckout(req, res) {
  await initMongoose();
  if (req.method !== "POST") {
    res.json('should have been POST, but it was not').send();
    return;
  }

  const {email,name,address,city} = req.body;
  const productsIds = req.body.products.split(',');
  const uniqIds = [...new Set(productsIds)];
  const products = await Product.find({_id:{$in:uniqIds}}).exec();
  res.json(products);
  return;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
  });
  res.redirect(303, session.url);
  res.json("ok");
}
