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
        it.skip('Create a new camera', (done) => {
            done()
        })

        it.skip('Passing wrong parameters', (done) => {
            done()
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