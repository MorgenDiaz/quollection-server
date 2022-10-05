const express = require(`express`);
const { getTags } = require(`./tags.controller`);

const tagsRouter = express.Router();

tagsRouter.get(`/`, getTags);

module.exports = tagsRouter;
