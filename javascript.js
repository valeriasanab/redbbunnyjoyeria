const express = require("express");
const stripe = require("stripe")("TU_CLAVE_SECRETA_AQUI");
const app = express();

app.use(express.json());

app.post("/crear-sesion", async (req, res) => {
  const { nombre, precio } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "cop",
          product_data: { name: nombre },
          unit_amount: precio * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://tusitio.com/exito.html",
    cancel_url: "https://tusitio.com/cancelado.html",
  });

  res.json({ id: session.id });
});

app.listen(3000, () => console.log("Servidor listo"));
