const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("sessions", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
    await queryInterface.addColumn("sessions", "created_at", {
      type: DataTypes.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn("sessions", "updated_at", {
      type: DataTypes.DATE,
      allowNull: false,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("sessions");
  },
};
