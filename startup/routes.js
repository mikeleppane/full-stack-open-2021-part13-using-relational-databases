const cors = require("cors");
const morganMiddleware = require("../middleware/httpLogging");
const blogRouter = require("../controllers/blogs");
const express = require("express");
const unknownEndpoint = require("../controllers/unknownEndpoint");
const errorHandler = require("../middleware/errorHandler");
const userRouter = require("../controllers/users");
const loginRouter = require("../controllers/login");
const authorRouter = require("../controllers/authors");
const readinglistRouter = require("../controllers/readinglists");
const logoutRouter = require("../controllers/logout");

const setupRoutes = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(morganMiddleware);
  app.use("/api/blogs", blogRouter);
  app.use("/api/users", userRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/logout", logoutRouter);
  app.use("/api/authors", authorRouter);
  app.use("/api/readinglists", readinglistRouter);
  app.use(unknownEndpoint);
  app.use(errorHandler);
};

module.exports = setupRoutes;
