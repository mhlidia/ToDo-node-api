const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { pool } = require("../db/connection");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios"
    });
  }

  const [existingUser] = await pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existingUser.length > 0) {
    return res.status(400).json({
      message: "El email ya está registrado"
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
    message: "Usuario registrado"
  });
};

const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "email y password son obligatorios"
    });
  }
  
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return res.status(401).json({
      message: "Credenciales inválidas"
    });
  }

  const user = rows[0];

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({
      message: "Credenciales inválidas"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
};

module.exports = {
  register,
  login
};