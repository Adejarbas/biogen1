'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("administrador", {
      id_admin: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      nome_admin: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      email_admin: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true
      },
      senha_admin: {
        allowNull: false,
        type: DataTypes.STRING(100), // Aumentei para 100 para armazenar senhas hash
      },
      is_super_admin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("administrador");
  }
};