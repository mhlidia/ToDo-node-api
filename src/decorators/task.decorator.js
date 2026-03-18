function tasksDecorator(rows) {

  const tasksMap = {};

  for (const row of rows) {

    if (!tasksMap[row.id]) {
      tasksMap[row.id] = {
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status,
        category: {
          id: row.category_id,
          name: row.category_name
        },
        user_id: row.user_id,
        tags: []
      };
    }

    if (row.tag_id) {
      tasksMap[row.id].tags.push({
        id: row.tag_id,
        name: row.tag_name,
        color: row.tag_color
      });
    }
  }

  return Object.values(tasksMap);
}

module.exports = {
  tasksDecorator
};