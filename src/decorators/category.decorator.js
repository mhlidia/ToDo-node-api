function categoryDecorator(category) {
  return {
    id: category.id,
    name: category.name,
    user_id: category.user_id
  };
}

function categoriesDecorator(categories) {
  return categories.map(categoryDecorator);
}

module.exports = {
  categoryDecorator,
  categoriesDecorator
};