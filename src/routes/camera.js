const express = require('express')
const controller = require('../controllers/camera')

const cameraRouter = express.Router()

cameraRouter.get('/', (req,res) => {
  controller.getAll('test', (err,resp) => {
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