import express from "express";
import "./env.js";
import cors from "cors";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// app.get("/checkout", async (req, res) => {
//   /*
//   req.body.items
//   [
//     {
//       id: 1,
//       quantity: 3,
//     }
//   ]

//   Stripe wants data formatted in this way
//   [
//     {
//       price: 1,
//       quantity: 3,
//     }
//   ]
//   */
//   console.log(req.body);
//   const items = req.body.items;
//   let lineItems = [];
//   items.forEach((item) => {
//     lineItems.push({
//       price: item.id,
//       quantity: item.quantity,
//     });
//   });

//   const session = await stripe.checkout.sessions.create({
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "http://localhost:3000/success",
//     cancel_url: "http://localhost:3000/cancel",
//   });

//   res.send(
//     JSON.stringify({
//       url: session.url,
//     })
//   );
// });

// app.use();

// clerk.expressRequireAuth()

app.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.title,
        images: [product.image],
      },
      unit_amount: product.price * 100,
    },
    quantity: parseInt(product.amount),
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:300/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});

app.listen(process.env.SERVER_PORT, () =>
  console.log(`App is listening on port ${process.env.SERVER_PORT}`)
);
