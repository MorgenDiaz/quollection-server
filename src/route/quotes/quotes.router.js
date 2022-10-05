const express = require(`express`);
const { getQuotes } = require(`./quotes.controller`);

const quotesRouter = express.Router();

quotesRouter.get(`/`, getQuotes);

module.exports = quotesRouter;
