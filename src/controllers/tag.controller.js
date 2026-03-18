const { v4: uuidv4 } = require("uuid");
const { pool } = require("../db/connection");
const {tagsDecorator} = require("../decorators/tag.decorator");

const store = async (req, res) => {
  const { name, color, user_id } = req.body;

  if (!name || !user_id) {
    return res.status(400).json({
      message: "name y user_id son obligatorios"
    });
  }

  const id = uuidv4();

  const query = `
    INSERT INTO tags (id, name, color, user_id)
    VALUES (?, ?, ?, ?)
  `;

  await pool.query(query, [id, name, color, user_id]);

  res.status(201).json({
    message: "Etiqueta creada correctamente"
  });
};

const index = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({
      message: "user_id es obligatorio"
    });
  }

  const [rows] = await pool.query("SELECT * FROM tags WHERE user_id = ?", [user_id]);

  res.json(tagsDecorator(rows));
}

const update = async (req, res) => {
  const { id } = req.params;
  const { name, color } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "El nombre es obligatorio"
    });
  }

  const query = `
    UPDATE tags
    SET name = ?, color = ?
    WHERE id = ?
  `;

  await pool.query(query, [name, color, id]);

  res.json({
    message: "Etiqueta actualizada"
  });
}

const destroy = async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM tags WHERE id = ?",
    [id]
  );

  res.json({
    message: "Etiqueta eliminada"
  });
}

module.exports = {
  store,
  index,
  update,
  destroy
};