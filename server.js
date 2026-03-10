const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // sirve tus archivos HTML

// 🔐 PEGA AQUÍ tu llave de integridad de Wompi
const INTEGRITY_KEY = "TU_LLAVE_DE_INTEGRIDAD_AQUI";

app.post("/generar-firma", (req, res) => {
  const { referencia, monto, moneda } = req.body;

  const cadena = referencia + monto + moneda + INTEGRITY_KEY;

  const firma = crypto
    .createHash("sha256")
    .update(cadena)
    .digest("hex");

  res.json({ firma });
});

app.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000")
);
