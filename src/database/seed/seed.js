const { client, quotesTable, tagsTable } = require(`../index`);
const testQuotes = require(`../quotes.testdata`);
const testTags = require(`../tags.testdata`);

async function dropQuotesTable() {
  await client.query(`DROP TABLE IF EXISTS quotes`);
}

async function dropTagsTable() {
  await client.query(`DROP TABLE IF EXISTS tags`);
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

async function createTagsTable() {
  await client.query(`
        CREATE TABLE IF NOT EXISTS tags(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL
        )
    `);
}

async function populateQuotesTable() {
  console.log("Populating quotes table");

  const insertQuotes = testQuotes.map((quote) => {
    return quotesTable.insertQuote(quote);
  });

  await Promise.all(insertQuotes);

  console.log("Finished populating quotes.");
}

async function populateTagsTable() {
  console.log("Populating tags table");

  const insertTags = testTags.map((tag) => {
    return tagsTable.insertTag(tag);
  });

  await Promise.all(insertTags);
}

async function dropTables() {
  await dropQuotesTable();
  await dropTagsTable();
}

async function createTables() {
  await createQuotesTable();
  await createTagsTable();
}

async function populateTables() {
  await populateQuotesTable();
  await populateTagsTable();
}

async function rebuildDatabase() {
  await dropTables();
  await createTables();
  await populateTables();
}

async function seed() {
  await client.connect();
  console.log("connected");
  await rebuildDatabase();
  console.log("getAllQuotes: \n", await quotesTable.getAllQuotes());
  console.log("getAllTags: \n", await tagsTable.getAllTags());
}

seed();
