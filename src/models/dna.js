const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'api-user',
  password: '1qaz2wsx',
  database: 'api_test'
});

let dnaModel = {};

dnaModel.getDnas = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM dna ORDER BY id',
      (err, rows) => {
        if (err) {
          throw err
        }
        else {
          callback(null, rows);
        }
      }
    )
  }
};

dnaModel.insertDna = (  dnaData, callback) => {
  if (connection) {
    connection.query('INSERT INTO dna SET ?', dnaData,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {'insertId': result.insertId})
        }
      }
    )
  }
};





module.exports = dnaModel;