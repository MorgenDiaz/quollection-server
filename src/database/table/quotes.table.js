class QuotesTable {
  constructor(client) {
    this.client = client;
  }

  async insertQuote({ content, author, creationDate }) {
    try {
      const {
        rows: [quote],
      } = await this.client.query(
        `
            INSERT INTO quotes (content, author, creationDate)
            VALUES($1, $2, $3)
            RETURNING *;
        `,
        [content, author, creationDate]
      );

      return quote;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllQuotes() {
    try {
      const { rows } = await this.client.query(`SELECT * FROM quotes`);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = QuotesTable;
