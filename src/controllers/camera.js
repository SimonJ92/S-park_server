const pool = require('../mysql_pool')

//loops until a connection is acquired (tries every second). This is needed because the pool tends to take a bit too much time to start, generating an error before giving the results
const attemptConnection = (sql, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('error connecting. retrying in 1 sec');
      setTimeout(attemptConnection, 1000);
    } else {
      connection.query(sql, (errQuery, results) => {
        connection.release();
        if (errQuery) {
          console.log('Error querying database!');
        } else {
          console.log('Successfully queried database.');
          callback(errQuery, results)
        }
      });
    }
  })
}

//List all tables to sanitate input down the line
const tablesList = []
attemptConnection("select table_name from information_schema.tables where table_schema = 's-park'", (err,res) => {
  res.forEach(element => {
    tablesList.push(element.TABLE_NAME)
  });
})

module.exports = {
  getAll: (tableName, callback) => {
    if(!tablesList.includes(tableName)) callback(new Error("This table doesn't exist"), null)
    else attemptConnection("Select * from "+tableName, callback)
  },
}
