const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'api-user',
  password: '1qaz2wsx',
  database: 'api-test',
  multipleStatements: true
  //socketPath: '/cloudsql/examen-ml-api:southamerica-east1:mldatabase' 
});

connection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = connection;