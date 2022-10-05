const express = require(`express`);
const quotesRouter = require(`./quotes/quotes.router`);
const tagsRouter = require(`./tags/tags.router`);

const api = express.Router();
api.use(express.json());

api.use(`/quotes`, quotesRouter);
api.use(`/tags`, tagsRouter);

module.exports = api;
