const repository = require('./repository.js')
const service = require('./service.js')
const { NOW, mockDate } = require('../test-support/date.js')

mockDate()
jest.mock('./repository.js')

describe('Save job position', () => {
  beforeEach(() => {
    repository.save.mockReset()
    repository.save.mockImplementation(jobPosition => ({_id: 'FAKE_ID', ...jobPosition}))
  })

  it('Should save properly', async () => {
    const jobPosition = {
      webPage: 'https://github.com/careers',
      company: { name: 'Github', province: 'PR' },
      jobRecruiter: { email: "recruiter@github.com", linkedIn: "recruiter-from-github" }
    }

    const savedJobPosition = await service.addJobPoisition(jobPosition, {'user-agent': 'chrome', ip: '::1'})

    expect(savedJobPosition).toEqual({_id: 'FAKE_ID', createdAt: NOW, isValid: true, ...jobPosition})
    expect(repository.save.mock.calls.length).toBe(1)
  })

  it('Should not save upon validation error', async () => {
    await expect(service.addJobPoisition({}, {})).rejects
      .toThrow('"webPage" is required. "company" is required. "jobRecruiter" is required')
      
    expect(repository.save.mock.calls.length).toBe(0)
  })

})