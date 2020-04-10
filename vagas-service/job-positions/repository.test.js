const repository = require('./repository.js')
const { connect, close } = require('../repository')

describe('Save entity properly', () => {
  beforeAll(async () => {
    await connect(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    await close()
  })

  it('Should return valid', async () => {
      const jobPosition = {
        webPage: 'https://github.com/careers',
        company: { name: 'Github', province: 'PR' },
        jobRecruiter: { email: "recruiter@github.com", linkedIn: "recruiter-from-github" }
      }

      const result = await repository.save(jobPosition)
    

      expect(result).toEqual(jobPosition)
      expect(result._id).toBeTruthy()
  })
})