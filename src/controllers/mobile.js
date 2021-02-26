const pool = require('../mysql_pool')
const configure = require('../configure')
const attemptConnection = require('../attemptConnection')

const config = configure()

module.exports = {
  getAll: (tableName, callback) => {
    //List all tables to sanitate input down the line
    attemptConnection(`select table_name from information_schema.tables where table_schema = "${config.mysql.database}"`, (err,res) => {
      const tablesList = []
      res.forEach(element => {
        tablesList.push(element.table_name)
      });
      if(!tablesList.includes(tableName)) callback(new Error("This table doesn't exist"), null)
      else attemptConnection("Select * from "+tableName, callback)
    })
  },
}