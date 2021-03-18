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
    
    //The tests always say that a table is missing if tables didn't exist before launch before actually acting normal.
    //This is to provoke the error before running any of the tests
    //Any better solution to the problem is welcome
    console.log("The tests always say that a table is missing if tables didn't exist before launch before actually acting normal.This is to provoke the error before running any of the tests. Any better solution to the problem is welcome.\n")
    attemptConnection('SELECT * FROM camera NATURAL JOIN parkingspot LIMIT 1', (err,res) => {})
  })
  
  describe('Cameras :', () => {
    
    it('Create new camera', (done) => {
      cameraController.createCamera('Address', (err, res) => {
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
      cameraController.createCamera('Address', (err1, res1) => {
        expect(err1).to.be.null
        expect(res1.result).to.equal('OK')
        expect(Number.isInteger(res1.cameraId)).to.be.true
        cameraController.getCameraInfos(res1.cameraId, (err2,res2) => {
          expect(err2).to.be.null
          expect(res2.result).to.equal('OK')
          expect(res2.address).to.equal('Address')
          done()
        })
      })
    })
    
    it('Update a camera\'s infos', (done) => {
      cameraController.createCamera('Address', (err1, res1) => {
        expect(err1).to.be.null
        expect(res1.result).to.equal('OK')
        expect(Number.isInteger(res1.cameraId)).to.be.true
        cameraController.updateCameraInfos(res1.cameraId, "New address", (err2,res2) => {
          expect(err2).to.be.null
          expect(res2.result).to.equal('OK')
          expect(res2.changedRows).to.eql(1)
          cameraController.getCameraInfos(res1.cameraId, (err3,res3) => {
            expect(err3).to.be.null
            expect(res3.result).to.equal('OK')
            expect(res3.address).to.equal('New address')
            done()
          })
        })
      })
    })
    
    it('Delete a camera', (done) => {
      cameraController.createCamera('Address', (err1, res1) => {
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
})