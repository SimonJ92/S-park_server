const { expect } = require('chai')
const attemptConnection = require('../src/attemptConnection')

//ORDER
require('./configure')

let pool

describe('MySQL', () => {
  before(() => {
    pool = require('../src/mysql_pool')
  })
  
  it('should connect to MySQL', (done) => {
    attemptConnection('SELECT 1 + 1 AS solution', (error, results, fields) => {
      if (error) throw error;
      expect(results[0].solution).to.eql(2)
      done()
    })
  })
})