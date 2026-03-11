const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testConnection } = require("./db/connection");
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API ToDo funcionando 🚀 :)"
  });
});

testConnection();

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint no encontrado"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT} :)`);
});

const errorMiddleware = require("./middlewares/error.middleware");

app.use(errorMiddleware);