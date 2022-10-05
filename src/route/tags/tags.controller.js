const tags = require(`../../database/tags.testData`);

async function getTags(req, res) {
  return tags;
}

module.exports = {
  getTags,
};
