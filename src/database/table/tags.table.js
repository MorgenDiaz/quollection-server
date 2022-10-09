class TagsTable {
  constructor(client) {
    this.client = client;
  }

  async insertTag({ name }) {
    try {
      const insertedTag = await this.client.query(
        `
            INSERT INTO tags(name)
            VALUES($1)
            RETURNING *
        `,
        [name]
      );

      return insertedTag;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async insertTags(tagNames) {
    const selectValues = tagNames
      .map((_, index) => `$${index + 1}`)
      .join("), (");

    try {
      const { rows: tagIds } = await this.client.query(
        `
            INSERT INTO tags(name)
            VALUES(${selectValues})
            ON CONFLICT (name) DO NOTHING
            RETURNING id
        `,
        tagNames
      );

      return tagIds;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllTags() {
    try {
      const { rows: tags } = await this.client.query(`SELECT * FROM tags`);
      return tags;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllForQuoteId(quoteId) {
    const { rows: tags } = await this.client.query(
      `
        SELECT * FROM tags
        WHERE id IN (
            SELECT "tagId" FROM quote_tags
            WHERE "quoteId" = $1
        )
    `,
      [quoteId]
    );

    return tags;
  }
}

module.exports = TagsTable;
