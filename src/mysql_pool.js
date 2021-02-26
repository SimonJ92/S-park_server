const mysql = require('mysql');
const configure = require('./configure')
const fs = require('fs');

const config = configure()

const creationConnection = mysql.createConnection({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  multipleStatements: true
})

const queries = fs.readFileSync(__dirname + '/../s-park_code.sql', { encoding: "UTF-8" }).split('--')

for (let query of queries) {
  if (query.length !== 0 && !query.match(/\/\*/) && !query.match(/--/)) {
    creationConnection.query(query, function (err, res, fields) {
      if (err) {
        console.log(`Importing failed for Mysql Database  - Query:\n${query}\n`);
        console.error(err);
      }else{
        //console.log(`Importing Mysql Database  - Query:\n${query}\n`)
      }
    })
  }
}

creationConnection.end()

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