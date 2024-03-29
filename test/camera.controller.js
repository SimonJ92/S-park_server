const { expect } = require('chai')
const attemptConnection = require('../src/attemptConnection')
const camera = require('../src/controllers/camera')
const cameraController = require('../src/controllers/camera')

//ORDER
require('./mysql_pool')

let pool

describe('Camera controller', () => {
  before(() => {
    pool = require('../src/mysql_pool')
  })
  
  it('Create new camera', (done) => {
    cameraController.createCamera(1, 2, (err, res) => {
      expect(err).to.be.null
      expect(res.result).to.equal('OK')
      expect(Number.isInteger(res.cameraId)).to.be.true
      done()
    })
  })
  
  it('Cannot get a non-existent camera\'s infos', (done) => {
    cameraController.getCameraInfos(-1, (err,res) => {
      expect(err).to.not.be.null
      expect(res).to.be.null
      done()
    })
  })
  
  it('Get a camera\'s infos', (done) => {
    cameraController.createCamera(1, 2, (err1, res1) => {
      expect(err1).to.be.null
      expect(res1.result).to.equal('OK')
      expect(Number.isInteger(res1.cameraId)).to.be.true
      cameraController.getCameraInfos(res1.cameraId, (err2,res2) => {
        expect(err2).to.be.null
        expect(res2.result).to.equal('OK')
        expect(res2.latitude).to.eql(1)
        expect(res2.longitude).to.eql(2)
        done()
      })
    })
  })

  it('Get all the cameras\' infos', (done) => {
    cameraController.createCamera(1, 2, (err1, res1) => {
      expect(err1).to.be.null
      expect(res1.result).to.equal('OK')
      expect(Number.isInteger(res1.cameraId)).to.be.true
      cameraController.listCameraInfos((err2,res2) => {
        expect(err2).to.be.null
        expect(res2.result).to.equal('OK')
        expect(res2.list).to.have.lengthOf.at.least(1)
        expect(res2.list[0].id).to.not.be.undefined
        expect(res2.list[0].latitude).to.not.be.undefined
        expect(res2.list[0].longitude).to.not.be.undefined
        done()
      })
    })
  })
  
  it('Update a camera\'s infos', (done) => {
    cameraController.createCamera(1, 2, (err1, res1) => {
      expect(err1).to.be.null
      expect(res1.result).to.equal('OK')
      expect(Number.isInteger(res1.cameraId)).to.be.true
      cameraController.updateCameraInfos(res1.cameraId, 10, 20, (err2,res2) => {
        expect(err2).to.be.null
        expect(res2.result).to.equal('OK')
        expect(res2.changedRows).to.eql(1)
        cameraController.getCameraInfos(res1.cameraId, (err3,res3) => {
          expect(err3).to.be.null
          expect(res3.result).to.equal('OK')
          expect(res3.latitude).to.eql(10)
          expect(res3.longitude).to.eql(20)
          done()
        })
      })
    })
  })
  
  it('Delete a camera', (done) => {
    cameraController.createCamera(1, 2, (err1, res1) => {
      expect(err1).to.be.null
      expect(res1.result).to.equal('OK')
      expect(Number.isInteger(res1.cameraId)).to.be.true
      cameraController.deleteCamera(res1.cameraId, (err2, res2) => {
        expect(err2).to.be.null
        expect(res2.result).to.equal('OK')
        expect(res2.affectedRows).to.eql(1)
        done()
      })
    })
  })
})