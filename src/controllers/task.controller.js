const { v4: uuidv4 } = require("uuid");
const { pool } = require("../db/connection");
const { tasksDecorator } = require("../decorators/task.decorator");

const store = async (req, res) => {
  const { title, description, status, category_id, tags } = req.body;
  const user_id = req.user.id;

  if (!title) {
    return res.status(400).json({
      message: "title es obligatorio"
    });
  }

  const id = uuidv4();

  const query = `
    INSERT INTO tasks (id, title, description, status, category_id, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  await pool.query(query, [
    id,
    title,
    description,
    status || "pending",
    category_id,
    user_id
  ]);

  /* guardar relación con tags */
  if (tags && tags.length > 0) {
    for (const tagId of tags) {
      await pool.query(
        `INSERT INTO tags_tasks (tag_id, task_id) VALUES (?, ?)`,
        [tagId, id]
      );
    }
  }

  res.status(201).json({
    message: "Tarea creada correctamente"
  });
};

const index = async (req, res) => {
  const user_id = req.user.id;

  const [rows] = await pool.query(
    `
    SELECT 
      t.*,
      c.name as category_name,
      tg.id as tag_id,
      tg.name as tag_name,
      tg.color as tag_color
    FROM tasks t
    LEFT JOIN categories c ON c.id = t.category_id
    LEFT JOIN tags_tasks tt ON t.id = tt.task_id
    LEFT JOIN tags tg ON tg.id = tt.tag_id
    WHERE t.user_id = ?
    `,
    [user_id]
  );

  res.json(tasksDecorator(rows));
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, category_id, tags } = req.body;
  const user_id = req.user.id;

  const query = `
    UPDATE tasks
    SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      status = COALESCE(?, status),
      category_id = COALESCE(?, category_id)
    WHERE id = ? AND user_id = ?
  `;

  await pool.query(query, [
    title,
    description,
    status,
    category_id,
    id,
    user_id
  ]);

  if (tags !== undefined) {

    await pool.query(
      `DELETE FROM tags_tasks WHERE task_id = ?`,
      [id]
    );

    for (const tagId of tags) {
      await pool.query(
        `INSERT INTO tags_tasks (tag_id, task_id) VALUES (?, ?)`,
        [tagId, id]
      );
    }
  }

  res.json({
    message: "Tarea actualizada correctamente"
  });
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  
  /* eliminar relaciones con tags */
  await pool.query(
    `DELETE FROM tags_tasks WHERE task_id = ?`,
    [id]
  );

  await pool.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, user_id]
  );

  res.json({
    message: "Tarea eliminada"
  });
};

module.exports = {
  store,
  index,
  update,
  destroy
};