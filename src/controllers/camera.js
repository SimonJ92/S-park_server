const pool = require('../mysql_pool')
const configure = require('../configure')
const attemptConnection = require('../attemptConnection')
const mysql = require('mysql')

const config = configure()

module.exports = {
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
  
  createCamera: (address, callback) => {
    attemptConnection(`INSERT INTO camera VALUES (NULL, ${mysql.escape(address)});`, (err, res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        res.cameraId = res.insertId
        callback(err,res)
      }
    })
  },
  getCameraInfos: (cameraId, callback) => {
    attemptConnection(`SELECT Address FROM camera WHERE Cameraid = `+mysql.escape(cameraId), (err, res) => {
      if(err) throw err
      else {
        res.address = res[0].Address
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
  updateCameraInfos: (cameraId, address, callback) => {
    attemptConnection(`UPDATE camera SET Address = ${mysql.escape(address)} WHERE Cameraid = `+mysql.escape(cameraId), (err,res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
  deleteCamera: (cameraId, callback) => {
    attemptConnection(`DELETE FROM camera WHERE Cameraid = `+mysql.escape(cameraId), (err,res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
  
  //PARKING SPOTS
  
  createParkingSpot: (cameraId, spotId, callback) => {
    attemptConnection(`INSERT INTO parkingspot VALUES(${mysql.escape(cameraId)},${mysql.escape(spotId)},TRUE)`, (err,res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
  updateParkingSpot: (cameraId, spotId, state, callback) => {
    
  },
  deleteParkingSpot: (cameraId, spotId, callback) => {
    
  }
}
