const { v4: uuidv4 } = require("uuid");
const { pool } = require("../db/connection");
const {
  categoryDecorator,
  categoriesDecorator
} = require("../decorators/category.decorator");

async function createCategory(req, res, next) {
  const { name, user_id } = req.body;

  const id = uuidv4();

  const query = `
    INSERT INTO categories (id, name, user_id)
    VALUES (?, ?, ?)
  `;

  await pool.query(query, [id, name, user_id]);

  res.status(201).json({
    message: "Categoría creada correctamente"
  });
}

async function getCategories(req, res, next) {
  const [rows] = await pool.query("SELECT * FROM categories");

  res.json(categoriesDecorator(rows));
}

async function updateCategory(req, res, next) {
  const { id } = req.params;
  const { name } = req.body;

  const query = `
    UPDATE categories
    SET name = ?
    WHERE id = ?
  `;

  await pool.query(query, [name, id]);

  res.json({
    message: "Categoría actualizada"
  });
}

async function deleteCategory(req, res, next) {
  const { id } = req.params;

  await pool.query("DELETE FROM categories WHERE id = ?", [id]);

  res.json({
    message: "Categoría eliminada"
  });
}

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};