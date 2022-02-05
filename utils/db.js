const mysql = require('mysql2');

/**
 * @autor Oscar Vargas
 * @function db
 * @date 2022-01-13
 * @returns {Promise}
 * @description Conexión con la base de datos MySQL
 */
module.exports.db = async () => {

  const { MYSQL_DB_USER, MYSQL_DB_PASS, MYSQL_DB_NAME, MYSQL_DB_HOST } = process.env
  console.log(MYSQL_DB_USER, MYSQL_DB_PASS, MYSQL_DB_NAME, MYSQL_DB_HOST)

  const db = mysql.createPool(
    {
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASS,
      database: MYSQL_DB_NAME
    }
  );

  return db.promise();
}