const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user:'symfony',
    password: '',
    database: 'account'
})

connection.connect();

module.exports = connection;