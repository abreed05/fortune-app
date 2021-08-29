const mysql = require('mysql');
const mongoose = require('mongoose');

let connection = mysql.createConnection({
    host: "dbhost",
    user: "dbuser",
    password: "dbpass",
    database: "dbname"
})
connection.connect(function(err) {
    if (err) {
        console.error('error connection: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId)
});

const dbURI = 'mongodb://dbuser:dbpass@dbhost:27017/users?authSource=admin'
let moncon = mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> console.log("Connected to Mongodb instance"))


module.exports = connection;
// module.exports = moncon;