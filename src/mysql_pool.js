const mysql = require('mysql');
const Importer = require('mysql-import');
const Pool = require('mysql/lib/Pool');
const configure = require('./configure')

const config = configure()

const importer = new Importer({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password
})

importer.onProgress(progress=>{
  var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
  console.log(`${percent}% Completed`);
})

importer.onDumpCompleted(completed => {
  console.log(completed.file_path+" imported !");
})

importer.import(__dirname + '/../s-park_get_or_create.sql')

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