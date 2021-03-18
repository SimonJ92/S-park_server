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
    it.skip('Get a camera by id', (done) => {
      done()
    })
    
    it.skip('Cannot get a non-existent camera', (done) => {
      done()
    })
    
    it.skip('List all cameras', (done) => {
      done()
    })
    
    it.skip('Get cameras by address', (done) => {
      done()
    })
  })
  
  describe('PUT /camera', () => {
    it.skip('Update a camera\'s address', (done) => {
      done()
    })
    
    it.skip('Cannot update a non-existent camera', (done) => {
      done()
    })
  })
  
  describe('DELETE /camera', () => {
    it.skip('Delete a camera by id', (done) => {
      done()
    })
    
    it.skip('Cannot delete non-existent camera', (done) => {
      done()
    })
  })
})