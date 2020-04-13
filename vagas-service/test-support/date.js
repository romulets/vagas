const mockNow = require('jest-mock-now')

const NOW = new Date('2020-04-12');
module.exports = {
  NOW,
  mockDate() {  
    mockNow(NOW)
  }
}