const { validate } = require('./entity.js')
const repository = require('./repository.js')

function cleanJobPosition(jobPosition) {
  delete jobPosition.user
  return jobPosition
}

module.exports = {
  getJobPositions() {
    const mockedEntity = {
      _id: 'FAKE_ID',
      webPage: 'https://github.com/careers',
      company: { name: 'Github', province: 'PR' },
      jobRecruiter: { email: "recruiter@github.com", linkedIn: "recruiter-from-github" },
      createdAt: '2020-04-10T10:00:00'
    }
    return [mockedEntity, mockedEntity, mockedEntity]
  },

  async addJobPoisition(jobPosition, { 'user-agent': userAgent, ip }) {
    const validationResult = validate(jobPosition)

    if (validationResult.error) {
      throw validationResult.error
    }

    const savedJobPosition = await repository.save({
      ...validationResult.value,
      createdAt: new Date(Date.now()),
      isValid: true,
      user: { userAgent, ip }
    })

    return cleanJobPosition(savedJobPosition)
  }
}