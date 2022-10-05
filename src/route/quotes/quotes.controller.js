const quotes = require(`../../database/quotes.testdata`);

async function getQuotes(req, res) {
  res.json(quotes);
}

module.exports = {
  getQuotes,
};
