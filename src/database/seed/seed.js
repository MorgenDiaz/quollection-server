const { client, quotesTable, tagsTable, quoteTagsTable } = require(`../index`);
const testQuotes = require(`../quotes.testdata`);
const testTags = require(`../tags.testdata`);

async function dropQuoteTagsTable() {
  await client.query(`DROP TABLE IF EXISTS quote_tags`);
}

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

async function createQuoteTagsTable() {
  await client.query(`CREATE TABLE quote_tags (
        "quoteId" INTEGER NOT NULL REFERENCES quotes(id),
        "tagId" INTEGER NOT NULL REFERENCES tags(id),
        UNIQUE("quoteId", "tagId")
    );`);
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

  await tagsTable.insertTags(testTags.map((tag) => tag.name));
}

async function dropTables() {
  await dropQuoteTagsTable();
  await dropQuotesTable();
  await dropTagsTable();
}

async function createTables() {
  await createQuotesTable();
  await createTagsTable();
  await createQuoteTagsTable();
}

async function populateTables() {
  await populateQuotesTable();
  await populateTagsTable();
}

async function rebuildDatabase() {
  await dropTables();
  await createTables();
  //await populateTables();
}

async function seed() {
  await client.connect();
  console.log("connected");
  await rebuildDatabase();
  const allQuotes = await quotesTable.getAllQuotes();
  const allTags = await tagsTable.getAllTags();
  console.log("getAllQuotes: \n", allQuotes);
  console.log("getAllTags: \n", allTags);

  /* const tagIds = [allTags[3].id, allTags[4].id, allTags[5].id];
  const quoteIds = [allQuotes[0].id, allQuotes[0].id, allQuotes[0].id];

  console.log("Adding quotes to ", allQuotes[0]);
  await quoteTagsTable.insertQuoteTags(quoteIds, tagIds); */
}

seed();
