const pool = require('./mysql_pool')

//loops until a connection is acquired (tries every second). This is needed because the pool tends to take a bit too much time to start, generating an error before giving the results
const attemptConnection = (sql, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err)
      console.log('error connecting. retrying in 1 sec');
      setTimeout(attemptConnection, 1000);
    } else {
      connection.query(sql, (errQuery, results) => {
        connection.release();
        if (errQuery) {
          //console.log('Error querying database!');
          //console.error(errQuery)
          callback(errQuery, null)
        } else {
          //console.log('Successfully queried database.');
          callback(errQuery, results)
        }
      });
    }
  })
}

module.exports = attemptConnection

