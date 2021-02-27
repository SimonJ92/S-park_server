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
    // attemptConnection('SELECT * FROM camera NATURAL JOIN parkingspot LIMIT 1', (err,res) => {
    //   if (err) {
    //     console.log('error connecting. retrying in 1 sec');
    //     setTimeout(attemptConnection, 1000);
    //   }
    // })
    setTimeout(() => {
      
    }, 2000);
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
  
  describe('Parking spots', () => {
    
    it('Create new parking spot', (done) => {
      cameraController.createCamera('Address', (err, res) => {
        expect(err).to.be.null
        expect(res.result).to.equal('OK')
        expect(Number.isInteger(res.cameraId)).to.be.true
        cameraController.createParkingSpot(res.cameraId, 1, (err, res) => {
          expect(err).to.be.null
          expect(res.result).to.equal('OK')
          pool.end()
          done()
        })
      })
      
    })
    
    it.skip('Update a parking spot', (done) => {
      
      pool.end()
      done()
    })
    
    it.skip('Delete a parking spot', (done) => {
      
      pool.end()
      done()
    })
    
    it.skip('Delete a parking spot by deleting the camera', (done) => {
      
      pool.end()
      done()
    })
  })
})