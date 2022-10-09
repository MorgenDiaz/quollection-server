class QuoteTagsTable {
  constructor(client) {
    this.client = client;
  }

  async insertQuoteTags(quoteIds, tagIds) {
    try {
      const result = await this.client.query(
        `
            INSERT INTO quote_tags("quoteId", "tagId")
            SELECT * FROM UNNEST($1:: integer[], $2:: integer[])
        `,
        [quoteIds, tagIds]
      );

      console.log("quah", result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = QuoteTagsTable;
