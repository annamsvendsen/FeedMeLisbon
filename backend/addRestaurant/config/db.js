const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'mysql',
    user: 'root',
    password: 'geiksmysql299', // Bytt ut med ditt passord
    database: 'feedme',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
