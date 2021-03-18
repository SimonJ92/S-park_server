const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

require('./parkingspot.controller')

chai.use(chaiHttp)

describe('Parking spot REST API', () => {
  after(() => {
    app.close()
  })    
  
  describe('POST /parkingspot', () => {
    it.skip('Create a new parking spot', (done) => {
      done()
    })
    
    it.skip('Cannot create duplicate parking spot', (done) => {
      done()
    })
    
    it.skip('Cannot create a parking spot from a non-existing camera', (done) => {
      done()
    })
  })
  
  describe('GET /parkingspot', () => {
    it.skip('Get a parking spot by ids', (done) => {
      done()
    })
    
    it.skip('List a camera\'s parking spots', (done) => {
      done()
    })
    
    it.skip('List all parking spots', (done) => {
      done()
    })
  })
  
  describe('PUT /parkingspot', () => {
    it.skip('Update a parking spot\'s address', (done) => {
      done()
    })
    
    it.skip('Cannot update a non-existent parking spot', (done) => {
      done()
    })
  })
  
  describe('DELETE /parkingspot', () => {
    it.skip('Delete a parking spot by ids', (done) => {
      done()
    })
    
    it.skip('Cannot delete non-existent parking spot', (done) => {
      done()
    })
  })
})