function tagDecorator(tag) {
  return {
    id: tag.id,
    name: tag.name,
    color: tag.color,
    user_id: tag.user_id
  };
}

function tagsDecorator(tags) {
  return tags.map(tagDecorator);
}

module.exports = {
  tagDecorator,
  tagsDecorator
};