const { client } = require(`../index`);

async function dropQuotesTable() {
  await client.query(`DROP TABLE IF EXISTS quotes`);
}

async function createQuotesTable() {
  await client.query(`
        CREATE TABLE IF NOT EXISTS quotes(
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            author VARCHAR(255) NOT NULL,
            creationDate DATE NOT NULL 
        )
    `);
}

async function seed() {
  await client.connect();
  console.log("connected");
  await dropQuotesTable();
  await createQuotesTable();
}

seed();
