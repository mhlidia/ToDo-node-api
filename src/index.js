const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API ToDo funcionando 🚀 :)"
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint no encontrado"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT} :)`);
});