var mysql      = require('mysql');
try {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root1234',
    database : 'AgendaClinica'
  });

  connection.connect();
}catch{
  console.log('error in db')
}

module.exports = connection;