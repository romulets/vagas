const { validate } = require('./entity.js')

module.exports = {
  getJobPositions() {
    const mockedEntity = {
      _id:  'FAKE_ID',
      webPage: 'https://github.com/careers',
      company: { name: 'Github', province: 'PR' },
      jobRecruiter: { email: "recruiter@github.com", linkedIn: "recruiter-from-github" },
      createdAt: '2020-04-10T10:00:00'
    }
    return [mockedEntity, mockedEntity, mockedEntity]
  },

  addJobPoisition(jobPosition) {
    const validationResult = validate(jobPosition)

    if (validationResult.error) {
      throw validationResult.error
    }

    const validatedJobPosition = {
      _id:  'FAKE_ID',
      ...validationResult.value,
      createdAt: '2020-04-10T10:00:00'
    }

    return validatedJobPosition
  }
}