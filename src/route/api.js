const express = require(`express`);
const quotesRouter = require(`./quotes/quotes.router`);

const api = express.Router();
api.use(express.json());

api.use(`/quotes`, quotesRouter);

module.exports = api;
