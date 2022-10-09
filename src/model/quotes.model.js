const { quotesTable, tagsTable } = require("../database");

class Quotes {
  constructor(quotesTable, tagsTable, quoteTagsTable) {
    this.quotesTable = quotesTable;
    this.tagsTable = tagsTable;
    this.quoteTagsTable = quoteTagsTable;
  }

  async create(quote) {
    try {
      const { tags, ...quoteFields } = quote;

      const insertedQuote = await quotesTable.insertQuote(quoteFields);

      if (!tags) {
        return insertedQuote;
      }

      const insertedTagIds = await tagsTable.insertTags(
        tags.map((tag) => tag.name)
      );

      const tagIds = insertedTagIds.map((tag) => tag.id);

      const quoteId = tagIds.map((_) => insertedQuote.id);
      this.quoteTagsTable.insertQuoteTags(quoteId, tagIds);

      return insertedQuote.id;
    } catch (error) {
      console.error(error);
      throw new Error("There was an issue creating the quote...");
    }
  }

  async getAll() {
    try {
      const quotes = await quotesTable.getAllQuotes();

      for (let i = 0; i < quotes.length; i++) {
        quotes[i].tags = await tagsTable.getAllForQuoteId(quotes[i].id);
      }

      return quotes;
    } catch (error) {
      console.error(error);
      throw new Error("Where was a problem getting the quotes...");
    }
  }
}

module.exports = Quotes;
