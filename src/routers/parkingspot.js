const { json } = require('express')
const express = require('express')
const controller = require('../controllers/parkingspot')

const parkingspotRouter = express.Router()

parkingspotRouter.post('/:cameraId/:spotId', (req,resp) => {
  controller.createParkingSpot(req.params.cameraId,req.params.spotId, (err,res) => {
    if (err) {
      respObj = {
        status: "error",
        msg: err.message
      }
      return resp.status(400).json(respObj)
    }
    respObj = {
      status: "success",
      cameraId: res.cameraId,
    }
    resp.status(201).json(respObj)
  })
})

parkingspotRouter.get('/:cameraId/:spotId', (req,resp) => {
  controller.getParkingSpotInfos(req.params.cameraId,req.params.spotId, (err,res) => {
    if (err) {
      respObj = {
        status: "error",
        msg: err.message
      }
      return resp.status(400).json(respObj)
    }
    respObj = {
      status: "success",
      isTaken: Boolean(res.isTaken),
    }
    resp.status(200).json(respObj)
  })
})

parkingspotRouter.get('/:cameraId', (req,resp) => {
  controller.listCameraSpots(req.params.cameraId, (err,res) => {
    if (err) {
      respObj = {
        status: "error",
        msg: err.message
      }
      return resp.status(400).json(respObj)
    }
    respObj = {
      list: res.list
    }
    resp.status(200).json(respObj)
  })
})

parkingspotRouter.get('/', (req,resp) => {
  controller.listParkingSpots((err,res) => {
    if (err) {
      respObj = {
        status: "error",
        msg: err.message
      }
      return resp.status(400).json(respObj)
    }
    respObj = {
      list: res.list
    }
    resp.status(200).json(respObj)
  })
})

parkingspotRouter.get('/near/:latitude/:longitude', (req,resp) => {
  controller.listCamerasWithAvailableSpotsByAddress(req.params.latitude,req.params.longitude, (err,res) => {
    if (err) {
      respObj = {
        status: "error",
        msg: err.message
      }
      return resp(400).json(respObj)
    }
    respObj = {
      list: res.list
    }
    resp.status(200).json(respObj)
  })
})

parkingspotRouter.patch('/:cameraId/:spotId/:newState', (req,resp) => {
  newState = parseInt(req.params.newState)
  if (newState != 0 && newState != 1) {
    respObj = {
      status: "error",
      msg: "Ths state of a parking spot can only be 0 or 1"
    }
    return resp.status(400).json(respObj)
  }
  controller.updateParkingSpot(req.params.cameraId,req.params.spotId,newState, (err,res) => {
    if (err) {
      respObj = {
        status: "error",
        msg: err.message
      }
      return resp.status(400).json(respObj)
    }
    respObj = {
      status: "success"
    }
    resp.status(201).json(respObj)
  })
})

parkingspotRouter.delete('/:cameraId/:spotId', (req,resp) => {
  controller.deleteParkingSpot(req.params.cameraId,req.params.spotId, (err,res) => {
    if (err) {
      respObj = {
        status: "error",
        msg: err.message
      }
      if (respObj.msg === "Camera or parking spot doesn't exist") {
        return resp.status(404).json(respObj)
      }
      return resp.status(400).json(respObj)
    }
    respObj = {
      status: "success"
    }
    resp.status(201).json(respObj)
  })
})

module.exports = parkingspotRouter