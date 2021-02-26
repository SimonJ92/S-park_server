const mysql = require('mysql');
const configure = require('./configure')

const config = configure()

pool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  charset: config.mysql.charset,
  multipleStatements: config.mysql.multipleStatements,
  acquireTimeout: config.mysql.acquireTimeout,
  waitForConnections: config.mysql.waitForConnections,
  connectionLimit: config.mysql.connectionLimit,
  queueLimit: config.mysql.queueLimit
})

process.on('SIGINT', () => {
  pool.end((err) => {
    if(err) console.error(err);
    else console.log("App terminated");
  });
})

pool.on("enqueue",() => {
  console.log("Waiting for connection slot")
})

pool.on('acquire', (connection) => {
  console.log('Connection %d acquired', connection.threadId);
})

module.exports = pool