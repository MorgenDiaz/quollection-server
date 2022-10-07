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

  async getAllTags() {
    try {
      const { rows: tags } = await this.client.query(`SELECT * FROM tags`);
      return tags;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = TagsTable;
