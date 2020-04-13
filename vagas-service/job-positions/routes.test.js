const request = require('supertest')
const app = require('./routes.js')
const repository = require('./repository.js')
const { mockDate } = require('../test-support/date.js')

mockDate()
jest.mock('./repository.js')

describe('Get job positions', () => {
  beforeAll(() => {
    repository.save.mockImplementation(jobPosition => ({_id: 'FAKE_ID', ...jobPosition}))
  })

  it('Should get successfully', async done => {
    const res = await request(app)
      .get('/')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body).toContainEqual({
      _id: 'FAKE_ID',
      webPage: 'https://github.com/careers',
      company: { name: 'Github', province: 'PR' },
      jobRecruiter: { email: 'recruiter@github.com', linkedIn: 'recruiter-from-github' },
      createdAt: '2020-04-10T10:00:00'
    })
    done()
  })
})

describe('Post job position', () => {
  it('Should post successfully', async done => {
    const res = await request(app)
      .post('/')
      .send({
        webPage: 'https://github.com/careers',
        company: { name: 'Github', province: 'PR' },
        jobRecruiter: { email: "recruiter@github.com", linkedIn: "recruiter-from-github" }
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      _id: 'FAKE_ID',
      webPage: 'https://github.com/careers',
      company: { name: 'Github', province: 'PR' },
      jobRecruiter: { email: "recruiter@github.com", linkedIn: "recruiter-from-github" },
      isValid: true,
      createdAt: '2020-04-12T00:00:00.000Z'
    })

    done()
  })

  it('Should return errors', async done => {
    const res = await request(app)
      .post('/')
      .send({})

    expect(res.statusCode).toEqual(406)
    expect(res.body).toBeTruthy()
    expect(res.body.error).toEqual('"webPage" is required. "company" is required. "jobRecruiter" is required')
    expect(res.body.details).toBeTruthy()

    done()
  })
})