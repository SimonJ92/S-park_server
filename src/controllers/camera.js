const pool = require('../mysql_client')

const sql ="Select * from test"

const attemptConnection = () =>
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
        console.log(results)
      }
    });
  }
})

module.exports = {
  getAll: (tableName, callback) => {
    /*pool.query("Select * from test", (err, res, fields) => {
      if (err) throw err
      console.log(res)
      callback(err,res)
    })*/
    attemptConnection()
  },
}
