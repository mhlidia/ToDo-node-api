const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { pool } = require("../db/connection");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = uuidv4();

    const query = `
      INSERT INTO users (id, name, email, password)
      VALUES (?, ?, ?, ?)
    `;

    await pool.query(query, [id, name, email, hashedPassword]);

    res.status(201).json({
      message: "Usuario registrado correctamente"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al registrar usuario"
    });
  }
}

module.exports = {
  register
};