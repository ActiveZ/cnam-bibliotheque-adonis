const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user:'cnam',
    password: 'cnam2020',
    database: 'biblio-node'
})

connection.connect();

module.exports = connection;