const { v4: uuidv4 } = require("uuid");
const { pool } = require("../db/connection");
const { categoriesDecorator } = require("../decorators/category.decorator");

const store = async (req, res) => {

  const { name } = req.body;
  const user_id = req.user.id;

  if (!name) {
    return res.status(400).json({
      message: "name es obligatorio"
    });
  }

  if (!name || !user_id) {
    return res.status(400).json({
      message: "name y user_id son obligatorios"
    });
  }

  const id = uuidv4();

  const query = `
    INSERT INTO categories (id, name, user_id)
    VALUES (?, ?, ?)
  `;

  await pool.query(query, [id, name, user_id]);

  res.status(201).json({
    message: "Categoría creada correctamente"
  });
};

const index = async (req, res) => {

  const user_id = req.user.id;

  const [rows] = await pool.query(
    `SELECT * FROM categories WHERE user_id = ?`,
    [user_id]
  );

  res.json(categoriesDecorator(rows));
};

const update = async (req, res) => {

  const { id } = req.params;
  const { name } = req.body;
  const user_id = req.user.id;

  if (!name) {
    return res.status(400).json({
      message: "name es obligatorio"
    });
  }

  if (!name) {
    return res.status(400).json({
      message: "name es obligatorio"
    });
  }

  const query = `
    UPDATE categories
    SET name = ?
    WHERE id = ? AND user_id = ?
  `;

  await pool.query(query, [name, id, user_id]);

  res.json({
    message: "Categoría actualizada"
  });
};

const destroy = async (req, res) => {

  const { id } = req.params;
  const user_id = req.user.id;

  await pool.query(
    `DELETE FROM categories WHERE id = ? AND user_id = ?`,
    [id, user_id]
  );

  res.json({
    message: "Categoría eliminada"
  });
};

module.exports = {
  store,
  index,
  update,
  destroy
};
