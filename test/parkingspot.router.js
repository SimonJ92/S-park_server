const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

let pool = require('../src/mysql_pool')

require('./parkingspot.controller')

chai.use(chaiHttp)

describe('Parking spot REST API', () => {
  after(() => {
    app.close()
    pool.end()
  })    
  
  describe('POST /parkingspot', () => {
    it('Create a new parking spot', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      const parkingspotId = 5
      
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          chai.expect(res2).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
      })
      .catch((err) => {
        throw err
      })
    })
    
    it('Cannot create duplicate parking spot', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      const parkingspotId = 5
      
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          chai.expect(res2).to.be.json
          
          chai.request(app)
          .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
          .then((res2) => {
            chai.expect(res2).to.have.status(400)
            chai.expect(res2.body.status).to.equal('error')
            chai.expect(res2).to.be.json
            done()
          })
          .catch((err) => {
            throw err
          })
        })
        .catch((err) => {
          throw err
        })
      })
      .catch((err) => {
        throw err
      })
    })
    
    it('Cannot create a parking spot from a non-existing camera', (done) => {
      const parkingspotId = 5
      chai.request(app)
      .post(`/parkingspot/0/${parkingspotId}`)
      .then((res) => {
        chai.expect(res).to.have.status(400)
        chai.expect(res.body.status).to.equal('error')
        chai.expect(res).to.be.json
        done()
      })
      .catch((err) => {
        throw err
      })
    })
  })
  
  describe('GET /parkingspot', () => {
    it('Get a parking spot by ids', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      const parkingspotId = 5
      
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          chai.expect(res2).to.be.json
          
          chai.request(app)
          .get(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
          .then((res3) => {
            chai.expect(res3).to.have.status(200)
            chai.expect(res3.body).to.eql({
              status: "success",
              isTaken: false
            })
            chai.expect(res3).to.be.json
            done()
          })
          .catch((err) => {
            throw err
          })
        })
        .catch((err) => {
          throw err
        })
      })
      .catch((err) => {
        throw err
      })
    })
    
    it('List a camera\'s parking spots', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      const parkingspotId = 5
      
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          chai.expect(res2).to.be.json
          
          chai.request(app)
          .get(`/parkingspot/${res1.body.cameraId}`)
          .then((res3) => {
            chai.expect(res3).to.have.status(200)
            chai.expect(res3).to.be.json
            chai.expect(res3.body.list).to.have.lengthOf.at.least(1)
            chai.expect(res3.body.list[0].spotId).to.not.be.undefined
            chai.expect(res3.body.list[0].isTaken).to.be.false
            done()
          })
          .catch((err) => {
            throw err
          })
        })
        .catch((err) => {
          throw err
        })
      })
      .catch((err) => {
        throw err
      })
    })
    
    it('List all parking spots', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      const parkingspotId = 5
      
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          chai.expect(res2).to.be.json
          
          chai.request(app)
          .get(`/parkingspot`)
          .then((res3) => {
            chai.expect(res3).to.have.status(200)
            chai.expect(res3).to.be.json
            chai.expect(res3.body.list).to.have.lengthOf.at.least(1)
            chai.expect(res3.body.list[0].cameraId).to.not.be.undefined
            chai.expect(res3.body.list[0].spotId).to.not.be.undefined
            chai.expect(res3.body.list[0].isTaken).to.be.false
            done()
          })
          .catch((err) => {
            throw err
          })
        })
        .catch((err) => {
          throw err
        })
      })
      .catch((err) => {
        throw err
      })
    })
  })
  
  describe('PATCH /parkingspot', () => {
    it.skip('Update a parking spot\'s address', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      const parkingspotId = 5
      
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          chai.expect(res2).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
      })
      .catch((err) => {
        throw err
      })
    })
    
    it.skip('Cannot update a non-existent parking spot', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      const parkingspotId = 5
      
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          chai.expect(res2).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
      })
      .catch((err) => {
        throw err
      })
    })
  })
  
  describe('DELETE /parkingspot', () => {
    it.skip('Delete a parking spot by ids', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      const parkingspotId = 5
      
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          chai.expect(res2).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
      })
      .catch((err) => {
        throw err
      })
    })
    
    it.skip('Cannot delete non-existent parking spot', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      const parkingspotId = 5
      
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .post(`/parkingspot/${res1.body.cameraId}/${parkingspotId}`)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          chai.expect(res2).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
      })
      .catch((err) => {
        throw err
      })
    })
  })
})