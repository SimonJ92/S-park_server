const { expect } = require('chai')
let pool

describe('MySQL', () => {
  
  before(() => {
    pool = require('../src/mysql_pool')
  })

  after(() => {
    pool.end()
  })
  
  it('should connect to MySQL', () => {
    pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
      if (error) throw error;
      expect(results[0].solution).to.eql(2)
    })

  })
})