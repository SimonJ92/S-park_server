const express = require('express')
const controller = require('../controllers/parkingspot')

const parkingspotRouter = express.Router()

parkingspotRouter.get('/:tableName', (req,res) => {
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

module.exports = parkingspotRouter