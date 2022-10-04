const express = require(`express`);
const morgan = require(`morgan`);

const { PORT = 4000 } = process.env;

const server = express();

server.use(morgan("combined"));

server.listen(PORT, () => {
  console.log("its quite good in the hood on the block of port ", PORT);
});
