const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

require('./camera.controller')

chai.use(chaiHttp)

describe('Camera REST API', () => {
  after(() => {
    app.close()
  })    
  
  describe('POST /camera', () => {
    it('Create a new camera', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res) => {
        chai.expect(res).to.have.status(201)
        chai.expect(res.body.status).to.equal('success')
        chai.expect(res.body.cameraId).to.not.be.undefined
        chai.expect(res).to.be.json
        done()
      })
      .catch((err) => {
        throw err
      })
    })
    
    it('Passing wrong parameters', (done) => {
      const camera = {
        latitude: 1.99,
      }
      chai.request(app)
      .post('/camera')
      .send(camera)
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
  
  describe('GET /camera', () => {
    it('Get a camera by id', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res) => {
        chai.expect(res).to.have.status(201)
        chai.expect(res.body.status).to.equal('success')
        chai.expect(res.body.cameraId).to.not.be.undefined
        chai.expect(res).to.be.json
        
        chai.request(app)
        .get('/camera/'+res.body.cameraId)
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.be.eql(camera)
          chai.expect(res).to.be.json
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
    
    it('Cannot get a non-existent camera', (done) => {
      chai.request(app)
      .get('/camera/0')
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
    
    it('List all cameras', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res) => {
        chai.expect(res).to.have.status(201)
        chai.expect(res.body.status).to.equal('success')
        chai.expect(res.body.cameraId).to.not.be.undefined
        chai.expect(res).to.be.json
        
        chai.request(app)
        .get('/camera')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res).to.be.json
          chai.expect(res.body.list).to.have.lengthOf.at.least(1)
          chai.expect(res.body.list[0].id).to.not.be.undefined
          chai.expect(res.body.list[0].latitude).to.not.be.undefined
          chai.expect(res.body.list[0].longitude).to.not.be.undefined
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
  
  describe('PATCH /camera', () => {
    it('Update a camera\'s address', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        const cameraUpdated = {
          latitude : -1,
          longitude : -2
        }
        
        chai.request(app)
        .patch('/camera/'+res1.body.cameraId)
        .send(cameraUpdated)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          
          chai.request(app)
          .get('/camera/'+res1.body.cameraId)
          .then((res3) => {
            chai.expect(res3).to.have.status(200)
            chai.expect(res3.body).to.be.eql(cameraUpdated)
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
    
    it('Passing wrong parameters', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        const cameraUpdated = {
          latitude: 1
        }
        
        chai.request(app)
        .patch('/camera/'+res1.body.cameraId)
        .send(cameraUpdated)
        .then((res2) => {
          chai.expect(res2).to.have.status(400)
          chai.expect(res2.body.status).to.equal('error')
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
  
  describe('DELETE /camera', () => {
    it('Delete a camera by id', (done) => {
      const camera = {
        latitude: 1.99,
        longitude: 2.99,
      }
      chai.request(app)
      .post('/camera')
      .send(camera)
      .then((res1) => {
        chai.expect(res1).to.have.status(201)
        chai.expect(res1.body.status).to.equal('success')
        chai.expect(res1.body.cameraId).to.not.be.undefined
        chai.expect(res1).to.be.json
        
        chai.request(app)
        .delete('/camera/'+res1.body.cameraId)
        .then((res2) => {
          chai.expect(res2).to.have.status(201)
          chai.expect(res2.body.status).to.equal('success')
          
          chai.request(app)
          .get('/camera/'+res1.body.cameraId)
          .then((res3) => {
            chai.expect(res3).to.have.status(400)
            chai.expect(res3.body.status).to.equal('error')
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
  })
})