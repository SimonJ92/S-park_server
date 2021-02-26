const { expect } = require('chai')
const attemptConnection = require('../src/attemptConnection')
let pool

describe('MySQL', async () => {
  before(() => {
    pool = require('../src/mysql_pool')
  })
  
  it('should connect to MySQL', () => {
    attemptConnection('SELECT 1 + 1 AS solution', (error, results, fields) => {
      if (error) throw error;
      expect(results[0].solution).to.eql(2)
      pool.end()
    })
  })
})