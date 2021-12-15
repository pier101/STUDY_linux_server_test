const maria = require('mysql');
const conn = maria.createConnection({
    host:'localhost',
    port:3306,
    user:'parkjh',
    password:'1234',
    database:'testProject'
});
module.exports = conn;
