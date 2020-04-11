const repository = require('../repository')

const collectionKey = 'job-positions'

module.exports = {
  async save(jobPosition) {
    return await repository.save(collectionKey, jobPosition)
  }
}