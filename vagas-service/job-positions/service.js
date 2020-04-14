const { validate } = require('./entity.js')
const { subtractDays, now } = require('../date')
const repository = require('./repository.js')

function cleanJobPosition(jobPosition) {
  jobPosition = { ...jobPosition }
  delete jobPosition.user
  return jobPosition
}

function getExpirationDate() {
  const jobPositionExpirationDay = process.env.JOB_POSITION_EXPIRATION_DAYS || 5
  return subtractDays(now(), jobPositionExpirationDay)
}

module.exports = {
  async getJobPositions(pageSize, currentPage) {
    const expirationDate = getExpirationDate()
    const queryResult = await repository.findValidJobPositions(expirationDate, pageSize, currentPage)
    queryResult.documents = queryResult.documents.map(cleanJobPosition)
    return queryResult
  },

  async addJobPoisition(jobPosition, { 'user-agent': userAgent, ip }) {
    const validationResult = validate(jobPosition)

    if (validationResult.error) {
      throw validationResult.error
    }

    const savedJobPosition = await repository.save({
      ...validationResult.value,
      createdAt: now(),
      isValid: true,
      user: { userAgent, ip }
    })

    return cleanJobPosition(savedJobPosition)
  }
}