/**
 * Central model loader
 * --------------------
 * • Creates a single Sequelize connection (SQLite in dev, can swap to MySQL in prod)
 * • Scans backend/models/*.js and registers each model
 * • Wires up associations
 * • Exports { sequelize, Sequelize, <Model1>, <Model2>, … }
 */

const fs        = require('fs');
const path      = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';

/* -------- Sequelize connection ---------------------------------- */
const sequelize = new Sequelize({
  dialect : 'sqlite',
  storage : process.env.SQLITE_FILE || path.join(__dirname, '..', 'contacts.db'),
  logging : false                   // set to console.log for SQL debug
});

/* -------- Dynamic import of all model files --------------------- */
const db = {};

fs.readdirSync(__dirname)
  .filter(file =>
    file !== basename &&
    file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

/* -------- Run associations -------------------------------------- */
Object.keys(db).forEach(name => {
  if (db[name].associate) db[name].associate(db);
});

/* -------- Export ------------------------------------------------- */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
