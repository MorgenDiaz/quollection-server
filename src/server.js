const express = require(`express`);
const morgan = require(`morgan`);
const api = require(`./route/api`);
const {
  client,
  quotesTable,
  tagsTable,
  quoteTagsTable,
} = require(`./database`);

const { PORT = 4000 } = process.env;

const server = express();

server.use(morgan("combined"));
server.use(`/api`, api);

server.listen(PORT, async () => {
  await client.connect();

  /* const quotes = new Quotes(quotesTable, tagsTable, quoteTagsTable);
  const testQuote = {
    content: "I like big butts. About this i may not lie.",
    author: "Mo Diggity",
    creationDate: "Aug 3, 2022",
    tags: [{ name: "test1" }, { name: "test2" }, { id: 3, name: "Personal" }],
  };

  const newQuoteId = await quotes.create(testQuote);
  const allQuotes = await quotes.getAll();
  console.log("All Quotes: ", allQuotes); */

  console.log("its quite good in the hood on the block of port ", PORT);
});
