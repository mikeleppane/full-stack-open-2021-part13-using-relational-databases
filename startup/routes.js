const cors = require("cors");
const morganMiddleware = require("../middleware/httpLogging");
const blogRouter = require("../controllers/blogs");
const express = require("express");
const unknownEndpoint = require("../controllers/unknownEndpoint");
const errorHandler = require("../middleware/errorHandler");

const setupRoutes = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(morganMiddleware);
  app.use("/api/blogs", blogRouter);
  app.use(unknownEndpoint);
  app.use(errorHandler);
};

module.exports = setupRoutes;
