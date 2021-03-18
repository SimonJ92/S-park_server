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
    }
    resp.status(201).json(respObj)
  })
})

cameraRouter.get('/:tableName', (req,res) => {
  controller.getAll(req.params.tableName, (err,resp) => {
    if(err){
      let respObj = {
        status: "error",
        msg: err.message
      }
      return res.status(400).json(respObj)
    }
    res.status(200).json(resp)
  })
})

module.exports = cameraRouter