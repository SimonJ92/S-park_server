const pool = require('../mysql_pool')
const configure = require('../configure')
const attemptConnection = require('../attemptConnection')
const mysql = require('mysql')

const config = configure()

module.exports = {
  //TODO : remove
  getAll: (tableName, callback) => {
    //List all tables to sanitate input down the line
    attemptConnection(`SELECT ${mysql.escape(table_name)} FROM information_schema.tables where table_schema = "${config.mysql.database}"`, (err,res) => {
      const tablesList = []
      res.forEach(element => {
        tablesList.push(element.table_name)
      });
      if(!tablesList.includes(tableName)) callback(new Error("This table doesn't exist"), null)
      else attemptConnection("Select * from "+tableName, callback)
    })
  },
  
  //CAMERAS
  
  createCamera: (latitude,longitude, callback) => {
    if(!latitude || !longitude)
      return callback(new Error("Wrong parameters"), null)
    attemptConnection(`INSERT INTO camera VALUES (NULL, ${mysql.escape(latitude)}, ${mysql.escape(longitude)});`, (err, res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        res.cameraId = res.insertId
        callback(err,res)
      }
    })
  },
  getCameraInfos: (cameraId, callback) => {
    if(!cameraId)
      return callback(new Error("Wrong parameters"), null)
    attemptConnection(`SELECT latitude,longitude FROM camera WHERE Cameraid = `+mysql.escape(cameraId), (err, res) => {
      if(err) throw err
      else {
        if(!res[0]) {
          return callback(new Error("Camera doesn't exist"), null)
        } else {
          res.latitude = res[0].latitude
          res.longitude = res[0].longitude
          res.result = 'OK'
          callback(err,res)
        }
      }
    })
  },
  updateCameraInfos: (cameraId, latitude, longitude, callback) => {
    if(!cameraId || !latitude || !longitude)
      return callback(new Error("Wrong parameters"), null)
    attemptConnection(`UPDATE camera SET latitude = ${mysql.escape(latitude)}, longitude = ${mysql.escape(longitude)} WHERE Cameraid = `+mysql.escape(cameraId), (err,res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
  deleteCamera: (cameraId, callback) => {
    if(!cameraId)
      return callback(new Error("Wrong parameters"), null)
    attemptConnection(`DELETE FROM camera WHERE Cameraid = `+mysql.escape(cameraId), (err,res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
}
