const pool = require('../mysql_pool')
const configure = require('../configure')
const attemptConnection = require('../attemptConnection')
const mysql = require('mysql')

const config = configure()

module.exports = {
  //PARKING SPOTS
  
  createParkingSpot: (cameraId, spotId, callback) => {
    if (!cameraId || !spotId)
      return callback(new Error("Wrong parameters"), null)
    attemptConnection(`INSERT INTO parkingspot VALUES(${mysql.escape(cameraId)},${mysql.escape(spotId)},FALSE)`, (err,res) => {
      if (err) return callback(err,null)
      else {
        res.result = 'OK'
        res.spotId = spotId
        callback(err,res)
      }
    })
  },
  getParkingSpotInfos: (cameraId, spotId, callback) => {
    if (!cameraId || !spotId)
      return callback(new Error("Wrong parameters"), null)
    attemptConnection(`SELECT IsTaken FROM parkingspot WHERE CameraId = `+mysql.escape(cameraId)+` AND SpotNumber = `+mysql.escape(spotId), (err,res) => {
      if (err) return callback(err,null)
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
  listCameraSpots: (cameraId,callback) => {
    if (!cameraId)
      return callback(new Error("Wrong parameters"), null)
    attemptConnection(`SELECT SpotNumber,IsTaken FROM parkingspot WHERE CameraId = `+mysql.escape(cameraId), (err, res) => {
      if (err) return callback(err,null)
      else {
        if (!res[0]) {
          return callback(new Error("No parking spot exists for this camera"), null)
        } else {
          var list = []
          res.forEach(row => {
            list.push({
              spotId: row.SpotNumber,
              isTaken: Boolean(row.IsTaken)
            }) 
          })
          res.list = list
          res.result = 'OK'
          callback(err,res)
        }
      }
    })
  },
  listParkingSpots: (callback) => {
    attemptConnection(`SELECT CameraId,SpotNumber,IsTaken FROM parkingspot`, (err, res) => {
      if (err) return callback(err,null)
      else {
        if(!res[0]) {
          return callback(new Error("No parking spot exists"), null)
        } else {
          var list = []
          res.forEach(row => {
            list.push({
              cameraId: row.CameraId,
              spotId: row.SpotNumber,
              isTaken: Boolean(row.IsTaken)
            })
          })
          res.list = list
          res.result = 'OK'
          callback(err,res)
        }
      }
    })
  },
  listCamerasWithAvailableSpotsByAddress: (latitude,longitude,callback) => {
    const MAXIMUM_DISTANCE_KM = 1
    const MAXIMUM_NB_RESULT = 10
    const EARTH_RADIUS_KM = 6371
    attemptConnection(`SELECT C.CameraId,C.latitude,C.longitude, (COUNT(P.IsTaken) - SUM(P.IsTaken)) as nbAvailable,
    ( ${EARTH_RADIUS_KM} * acos( cos( radians(${mysql.escape(latitude)}) ) * cos( radians( C.latitude ) ) * 
    cos( radians( C.longitude ) - radians(${mysql.escape(longitude)}) ) + sin( radians(${mysql.escape(latitude)}) ) * 
    sin( radians( C.latitude ) ) ) ) AS distance
    FROM camera as C NATURAL JOIN parkingspot as P
    GROUP BY C.CameraId
    HAVING (COUNT(P.IsTaken) - SUM(P.IsTaken)) > 0 AND distance < ${MAXIMUM_DISTANCE_KM}
    ORDER BY distance ASC
    LIMIT 0,${MAXIMUM_NB_RESULT}`, (err,res) => {
      if (err) return callback(err,null)
      else {
        if(!res[0]) {
          return callback(new Error("No parking spot nearby"), null)
        } else {
          var list = []
          res.forEach(row => {
            list.push({
              cameraId: row.CameraId,
              latitude: row.latitude,
              longitude: row.longitude,
              nbAvailable: row.nbAvailable,
              distance: row.distance
            })
          })
          res.list = list
          res.result = 'OK'
          callback(err,res)
        }
      }
    })
  },
  updateParkingSpot: (cameraId, spotId, state, callback) => {
    if (!cameraId || !spotId || !state)
      return callback(new Error("Wrong parameters"), null)
    attemptConnection(`UPDATE parkingspot SET IsTaken = ${mysql.escape(state)} WHERE CameraId = `+mysql.escape(cameraId)+` AND SpotNumber = `+mysql.escape(spotId), (err,res) => {
      if (err) return callback(err,null)
      else {
        if (!res.affectedRows) return callback(new Error("Camera doesn't exist"), null)
        res.result = 'OK'
        callback(err,res)
      }
    })
  },
  deleteParkingSpot: (cameraId, spotId, callback) => {
    if (!cameraId || !spotId)
      return callback(new Error("Wrong parameters"), null)
    attemptConnection(`DELETE FROM parkingspot WHERE CameraId = `+mysql.escape(cameraId)+` AND SpotNumber = `+mysql.escape(spotId), (err,res) => {
      if (err) return callback(err,null)
      else {
        if (!res.affectedRows) return callback(new Error("Camera or parking spot doesn't exist"), null)
        res.result = 'OK'
        callback(err,res)
      }
    })
  }
}