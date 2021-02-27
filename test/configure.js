const { expect } = require('chai')
const configure = require('../src/configure')

describe('Configure', () => {
  it('load default json configuration file', (done) => {
    const config = configure()
    expect(config.mysql).to.eql({
      "host": "127.0.0.1",
      "port": 3306,
      "user": "root",
      "password": "",
      "database": "s-park",
      "charset": "UTF8_GENERAL_CI",
      "multipleStatements": false,
      "acquireTimeout": 30000,
      "waitForConnections": true,
      "connectionLimit": 10,
      "queueLimit": 0})
      done()
    })
    it('load custom configuration', (done) => {
      const config_custom = {"custom": "value"}
      const config = configure(config_custom)
      expect(config).to.eql({"mysql": {
        "host": "127.0.0.1",
        "port": 3306,
        "user": "root",
        "password": "",
        "database": "s-park",
        "charset": "UTF8_GENERAL_CI",
        "multipleStatements": false,
        "acquireTimeout": 30000,
        "waitForConnections": true,
        "connectionLimit": 10,
        "queueLimit": 0
      }, "custom": "value"})
      done()
    })
  })
  