const tags = require(`../../database/tags.testdata`);

async function getTags(req, res) {
  res.json(tags);
}

module.exports = {
  getTags,
};
