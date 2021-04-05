const { expect } = require('chai')
const attemptConnection = require('../src/attemptConnection')
const cameraController = require('../src/controllers/camera')
const parkingspotController = require('../src/controllers/parkingspot')

//ORDER
require('./camera.controller')

let pool

describe('Parking spot controller', () => {
  before(() => {
    pool = require('../src/mysql_pool')
  })
  
  it('Create new parking spot', (done) => {
    cameraController.createCamera(1, 2, (err1, res1) => {
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
    cameraController.createCamera(1, 2, (err1, res1) => {
      expect(err1).to.be.null
      expect(res1.result).to.equal('OK')
      expect(Number.isInteger(res1.cameraId)).to.be.true
      parkingspotController.getParkingSpotInfos(res1.cameraId, 1, (err2,res2) => {
        expect(err2).to.not.be.null
        expect(res2).to.be.null
        done()
      })
    })
  })
  
  it('Get a parking spot\'s infos', (done) => {
    cameraController.createCamera(1, 2, (err1, res1) => {
      expect(err1).to.be.null
      expect(res1.result).to.equal('OK')
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

  //The coordinates in this test correspond to addresses within 1km of distance
  it('Find camera with available spots by address',  (done) => {
    cameraController.createCamera(48.858483334533695, 2.294519957503645, (err1, res1) => {
      expect(err1).to.be.null
      expect(res1.result).to.equal('OK')
      expect(Number.isInteger(res1.cameraId)).to.be.true
      parkingspotController.createParkingSpot(res1.cameraId, 1, (err2, res2) => {
        expect(err2).to.be.null
        expect(res2.result).to.equal('OK')
        expect(res2.spotId).to.eql(1)
        parkingspotController.listCamerasWithAvailableSpotsByAddress(48.85169,2.28703, (err3,res3) => {
          expect(err3).to.be.null
          expect(res3.result).to.equal('OK')
          expect(res3.list[0].latitude).to.not.be.undefined
          expect(res3.list[0].longitude).to.not.be.undefined
          expect(res3.list[0].nbAvailable).to.be.at.least(1)
          expect(res3.list[0].distance).to.not.be.undefined
          expect(res3.list[0].cameraId).to.not.be.undefined
          done()
        })
      })
    })
  })
  
  it('Update a parking spot', (done) => {
    cameraController.createCamera(1, 2, (err1, res1) => {
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
    cameraController.createCamera(1, 2, (err1, res1) => {
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
    cameraController.createCamera(1, 2, (err1, res1) => {
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
            done()
          })
        })
      })
    })
  })
})