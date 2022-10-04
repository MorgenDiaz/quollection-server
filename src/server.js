const express = require(`express`);
const morgan = require(`morgan`);
const api = require(`./route/api`);

const { PORT = 4000 } = process.env;

const server = express();

server.use(morgan("combined"));
server.use(`/api`, api);

server.listen(PORT, () => {
  console.log("its quite good in the hood on the block of port ", PORT);
});
