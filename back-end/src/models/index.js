'use strict';

const { Sequelize } = require('sequelize');
const { User } = require('./user.model');
const { Supplier } = require('./supplier.model');
const { Recipient } = require('./recipient.model');

const config = require('../config/database');
const db = {};

const sequelize = new Sequelize(config);

// Inicializa os models
const models = [User, Supplier, Recipient];

models.forEach(model => {
    const modelInstance = model.init(sequelize);
    db[model.name] = modelInstance;
});

// Executa as associações se existirem
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
