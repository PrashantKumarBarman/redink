// get the client
const mysql = require('mysql2/promise');

let connection = null;

(async function() {
    try {
        connection = await mysql.createConnection({ 
            host: process.env.mysql_host, 
            user: process.env.mysql_user, 
            database: process.env.mysql_database,
            password: process.env.mysql_password 
        });
    }
    catch(err) {
        console.log(err);
    }
})();

module.exports = {
    getConnection: function() {
        return connection;
    }
}