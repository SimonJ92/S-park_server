const mysql = require('mysql');
const Pool = require('mysql/lib/Pool');

pool = mysql.createPool({
  connectionLimit: 10,  //TBD
  waitForConnections: true,  //default value
  queueLimit: 0,  //unlimited (default value) - TBD
  acquireTimeout: 30000,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 's-park',
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