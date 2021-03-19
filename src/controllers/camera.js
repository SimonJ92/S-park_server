const pool = require('../mysql_pool')
const configure = require('../configure')
const attemptConnection = require('../attemptConnection')
const mysql = require('mysql')

const config = configure()

module.exports = {
  //CAMERAS
  
  createCamera: (latitude,longitude, callback) => {
    if(!latitude || !longitude)
    return callback(new Error("Wrong parameters"), null)
    attemptConnection(`INSERT INTO camera VALUES (NULL, ${mysql.escape(latitude)}, ${mysql.escape(longitude)});`, (err, res) => {
      if (err) return callback(err,null)
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
      if(err) return callback(err,null)
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
  listCameraInfos: (callback) => {
    attemptConnection(`SELECT Cameraid,latitude,longitude FROM camera`, (err, res) => {
      if(err) return callback(err,null)
      else {
        if(!res[0]) {
          return callback(new Error("No camera exists"), null)
        } else {
          var list = []
          res.forEach(row => {
            list.push({
              id: row.Cameraid,
              latitude : row.latitude,
              longitude : row.longitude
            }) 
          })
          res.list = list
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
      if (err) return callback(err,null)
      else {
        if (!res.affectedRows) return callback(new Error("Camera doesn't exist"), null)
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
  deleteCamera: (cameraId, callback) => {
    if(!cameraId)
    return callback(new Error("Wrong parameters"), null)
    attemptConnection(`DELETE FROM camera WHERE Cameraid = `+mysql.escape(cameraId), (err,res) => {
      if (err) return callback(err,null)
      else {
        
        if (!res.affectedRows) return callback(new Error("Camera doesn't exist"), null)
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
}
