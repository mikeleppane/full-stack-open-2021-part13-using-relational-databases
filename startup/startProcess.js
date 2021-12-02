const { connectToDatabase } = require("../util/db");
const { PORT } = require("../util/config");

const start = async (app) => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

module.exports = start;
