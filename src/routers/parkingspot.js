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

module.exports = parkingspotRouter