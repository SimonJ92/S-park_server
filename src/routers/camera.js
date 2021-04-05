const express = require('express')
const controller = require('../controllers/camera')

const cameraRouter = express.Router()

cameraRouter.post('/', (req,resp) => {
  controller.createCamera(req.body.latitude, req.body.longitude, (err,res) => {
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

cameraRouter.get('/:cameraId', (req,resp) => {
  controller.getCameraInfos(req.params.cameraId, (err,res) => {
    if (err) {
      respObj = {
        status: "error",
        msg: err.message
      }
      return resp.status(400).json(respObj)
    }
    respObj = {
      latitude : res.latitude,
      longitude: res.longitude,
    }
    resp.status(200).json(respObj)
  })
})

cameraRouter.get('/', (req,resp) => {
  controller.listCameraInfos((err,res) => {
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

cameraRouter.patch('/:cameraId', (req,resp) => {
  controller.updateCameraInfos(req.params.cameraId,req.body.latitude, req.body.longitude, (err,res) => {
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

cameraRouter.delete('/:cameraId', (req,resp) => {
  controller.deleteCamera(req.params.cameraId, (err,res) => {
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

module.exports = cameraRouter