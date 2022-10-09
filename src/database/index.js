const { Client } = require(`pg`);
const QuotesTable = require(`./table/quotes.table`);
const TagsTable = require(`./table/tags.table`);
const QuoteTagsTable = require(`./table/quote_tags.table`);

const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/quollection-dev"
);

const quotesTable = new QuotesTable(client);
const tagsTable = new TagsTable(client);
const quoteTagsTable = new QuoteTagsTable(client);

module.exports = { client, quotesTable, tagsTable, quoteTagsTable };
