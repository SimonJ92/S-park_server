const pool = require('../mysql_pool')
const configure = require('../configure')
const attemptConnection = require('../attemptConnection')
const mysql = require('mysql')

const config = configure()

module.exports = {
  //PARKING SPOTS
  
  createParkingSpot: (cameraId, spotId, callback) => {
    attemptConnection(`INSERT INTO parkingspot VALUES(${mysql.escape(cameraId)},${mysql.escape(spotId)},FALSE)`, (err,res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        res.spotId = spotId
        callback(err,res)
      }
    })
  },
  getParkingSpotInfos: (cameraId, spotId, callback) => {
    attemptConnection(`SELECT IsTaken FROM parkingspot WHERE CameraId = `+mysql.escape(cameraId)+` AND SpotNumber = `+mysql.escape(spotId), (err,res) => {
      if (err) throw err
      else {
        if(!res[0]) {
          callback(new Error("Spot doesn't exist"), null)
        } else {
          res.result = 'OK'
          res.isTaken = res[0].IsTaken
          callback(err,res)
        }
      }
    })
  },
  updateParkingSpot: (cameraId, spotId, state, callback) => {
    attemptConnection(`UPDATE parkingspot SET IsTaken = ${mysql.escape(state)} WHERE CameraId = `+mysql.escape(cameraId)+` AND SpotNumber = `+mysql.escape(spotId), (err,res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
  deleteParkingSpot: (cameraId, spotId, callback) => {
    attemptConnection(`DELETE FROM parkingspot WHERE CameraId = `+mysql.escape(cameraId)+` AND SpotNumber = `+mysql.escape(spotId), (err,res) => {
      if (err) throw err
      else {
        res.result = 'OK'
        callback(err,res)
      }
    })
  }
}