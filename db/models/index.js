'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

/* Custom handler for reading current working directory */
const models = process.cwd() + '/db/models/' || __dirname;

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}


if (env == "development") {
  try {
    (async () => {
      let allowLoadDBOnceTime = 0;
      if (allowLoadDBOnceTime == 0) {
        console.log("[INFO] INICIANDO BASE DE DATOS")
        // await sequelize.sync({ force: true });
        allowLoadDBOnceTime++;
      }
    })()
  } catch (err) {
    console.log("[ ERROR ] NO SE PUDO FORZAR A CREAR LA BBDD")
  }
}

/* fs.readdirSync(__dirname) */
fs.readdirSync(models)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    /* const model = sequelize["import"](path.join(__dirname, file)); */
    const model = require("./".concat(file))(sequelize, Sequelize.DataTypes)
    console.log(model.name)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;