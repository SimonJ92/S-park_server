const { expect } = require('chai')
const attemptConnection = require('../src/attemptConnection')
const cameraController = require('../src/controllers/camera')
const parkingspotController = require('../src/controllers/parkingspot')

//ORDER
require('./camera.controller')

let pool

describe('Camera controller', () => {
  before(() => {
    pool = require('../src/mysql_pool')
  })
  
  describe('Parking spots', () => {
    
    it('Create new parking spot', (done) => {
      cameraController.createCamera('Address', (err1, res1) => {
        expect(err1).to.be.null
        expect(res1.result).to.equal('OK')
        expect(Number.isInteger(res1.cameraId)).to.be.true
        parkingspotController.createParkingSpot(res1.cameraId, 1, (err2, res2) => {
          expect(err2).to.be.null
          expect(res2.result).to.equal('OK')
          expect(res2.spotId).to.eql(1)
          done()
        })
      })
    })
    
    it('Cannot get a non-existent spot\'s infos', (done) => {
      cameraController.createCamera('Address', (err1, res1) => {
        expect(err1).to.be.null
        expect(res1.result).to.equal('OK')
        expect(Number.isInteger(res1.cameraId)).to.be.true
        expect(Number.isInteger(res1.cameraId)).to.be.true
        parkingspotController.getParkingSpotInfos(res1.cameraId, 1, (err2,res2) => {
          expect(err2).to.not.be.null
          expect(res2).to.be.null
          done()
        })
      })
    })
    
    it('Get a parking spot\'s infos', (done) => {
      cameraController.createCamera('Address', (err1, res1) => {
        expect(err1).to.be.null
        expect(res1.result).to.equal('OK')
        expect(Number.isInteger(res1.cameraId)).to.be.true
        expect(Number.isInteger(res1.cameraId)).to.be.true
        parkingspotController.createParkingSpot(res1.cameraId, 1, (err2, res2) => {
          expect(err2).to.be.null
          expect(res2.result).to.equal('OK')
          expect(res2.spotId).to.eql(1)
          parkingspotController.getParkingSpotInfos(res1.cameraId, res2.spotId, (err3,res3) => {
            expect(err3).to.be.null
            expect(res3.result).to.equal('OK')
            expect(res3.isTaken).to.eql(0)
            done()
          })
        })
      })
    })
    
    it('Update a parking spot', (done) => {
      cameraController.createCamera('Address', (err1, res1) => {
        expect(err1).to.be.null
        expect(res1.result).to.equal('OK')
        expect(Number.isInteger(res1.cameraId)).to.be.true
        parkingspotController.createParkingSpot(res1.cameraId, 1, (err2, res2) => {
          expect(err2).to.be.null
          expect(res2.result).to.equal('OK')
          expect(res2.spotId).to.eql(1)
          parkingspotController.updateParkingSpot(res1.cameraId, res2.spotId, 1, (err3,res3) => {
            expect(err3).to.be.null
            expect(res3.result).to.equal('OK')
            expect(res3.changedRows).to.eql(1)
            parkingspotController.getParkingSpotInfos(res1.cameraId, res2.spotId, (err4,res4) => {
              expect(err4).to.be.null
              expect(res4.result).to.equal('OK')
              expect(res4.isTaken).to.eql(1)
              done()
            })
          })
        })
      })
    })
    
    it('Delete a parking spot', (done) => {
      cameraController.createCamera('Address', (err1, res1) => {
        expect(err1).to.be.null
        expect(res1.result).to.equal('OK')
        expect(Number.isInteger(res1.cameraId)).to.be.true
        parkingspotController.createParkingSpot(res1.cameraId, 1, (err2, res2) => {
          expect(err2).to.be.null
          expect(res2.result).to.equal('OK')
          expect(res2.spotId).to.eql(1)
          parkingspotController.deleteParkingSpot(res1.cameraId, res2.spotId, (err3,res3) => {
            expect(err3).to.be.null
            expect(res3.result).to.equal('OK')
            expect(res3.affectedRows).to.eql(1)
            done()
          })
        })
      })
    })
    
    it('Delete a parking spot by deleting the camera', (done) => {
      cameraController.createCamera('Address', (err1, res1) => {
        expect(err1).to.be.null
        expect(res1.result).to.equal('OK')
        expect(Number.isInteger(res1.cameraId)).to.be.true
        parkingspotController.createParkingSpot(res1.cameraId, 1, (err2, res2) => {
          expect(err2).to.be.null
          expect(res2.result).to.equal('OK')
          expect(res2.spotId).to.eql(1)
          cameraController.deleteCamera(res1.cameraId, (err3, res3) => {
            expect(err3).to.be.null
            expect(res3.result).to.equal('OK')
            expect(res3.affectedRows).to.eql(1)
            parkingspotController.getParkingSpotInfos(res1.cameraId, res2.spotId, (err4,res4) => {
              expect(err4).to.not.be.null
              expect(res4).to.be.null
              pool.end()
              done()
            })
          })
        })
      })
    })
  })
})