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

describe('Get job positions', () => {
  beforeEach(() => {
    repository.findValidJobPositions.mockReset()
    repository.findValidJobPositions.mockImplementation(() => ({
      total: 2,
      pageSize: 2,
      currentPage: 1,
      pagesCount: 1,
      documents: [
        {
          _id: '1',
          webPage: 'https://github.com/careers',
          company: { name: 'Github', province: 'PR' },
          jobRecruiter: { email: 'recruiter@github.com', linkedIn: 'recruiter-from-github' },
          createdAt: '2020-04-10T10:00:00',
          user: {any: true}
        },
        {
          _id: '2',
          webPage: 'https://github.com/careers',
          company: { name: 'Github', province: 'PR' },
          jobRecruiter: { email: 'recruiter@github.com', linkedIn: 'recruiter-from-github' },
          createdAt: '2020-04-10T10:00:00',
          user: {any: true}
        }
      ]
    }))
  })

  it('Should get valid job positions without parameters', async () => {
    const queryResult = await service.getJobPositions()

    expect(repository.findValidJobPositions.mock.calls.length).toBe(1)
    expect(repository.findValidJobPositions.mock.calls[0][0]).toEqual(new Date('2020-04-07'))
    expect(repository.findValidJobPositions.mock.calls[0][1]).toBeUndefined()
    expect(repository.findValidJobPositions.mock.calls[0][2]).toBeUndefined()
    expect(queryResult.documents.length).toBe(2)
    expect(queryResult.documents[0].user).toBeUndefined()
    expect(queryResult.documents[1].user).toBeUndefined()
  })

  it('Should get valid job positions with parameters', async () => {
    const queryResult = await service.getJobPositions(10, 2)

    expect(repository.findValidJobPositions.mock.calls.length).toBe(1)
    expect(repository.findValidJobPositions.mock.calls[0][0]).toEqual(new Date('2020-04-07'))
    expect(repository.findValidJobPositions.mock.calls[0][1]).toBe(10)
    expect(repository.findValidJobPositions.mock.calls[0][2]).toBe(2)
    expect(queryResult.documents.length).toBe(2)
    expect(queryResult.documents[0].user).toBeUndefined()
    expect(queryResult.documents[1].user).toBeUndefined()
  })
})