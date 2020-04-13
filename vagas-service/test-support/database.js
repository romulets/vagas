const { connect, close } = require('../repository')

module.exports = {
  async openTestConnection() {
    await connect(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
  },

  async closeTestConnection()  {
    await close()
  }
}