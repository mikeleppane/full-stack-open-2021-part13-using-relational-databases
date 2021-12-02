const express = require("express");
require("express-async-errors");
const app = express();
const start = require("./startup/startProcess");
const setupRoutes = require("./startup/routes");

setupRoutes(app);

start(app).catch((error) => console.error(error));
