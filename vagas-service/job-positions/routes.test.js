const request = require('supertest')
const app = require('./routes.js')
const repository = require('./repository.js')
const { mockDate } = require('../test-support/date.js')

mockDate()
jest.mock('./repository.js')

describe('Get job positions', () => {
  beforeAll(() => {
    repository.save.mockImplementation(jobPosition => ({_id: 'FAKE_ID', ...jobPosition}))
    repository.findValidJobPositions.mockReset()
    repository.findValidJobPositions.mockImplementation((_, pageSize, page) => ({
      total: 2,
      pageSize: pageSize || 10,
      currentPage: page || 1,
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

  it('Should get without parameters', async done => {
    const res = await request(app)
      .get('/')

    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(2)
    expect(res.body.pageSize).toBe(10)
    expect(res.body.currentPage).toBe(1)
    expect(res.body.pagesCount).toBe(1)
    expect(res.body.documents.length).toBe(2)
    expect(res.body.documents).toContainEqual({
          _id: '1',
          webPage: 'https://github.com/careers',
          company: { name: 'Github', province: 'PR' },
          jobRecruiter: { email: 'recruiter@github.com', linkedIn: 'recruiter-from-github' },
          createdAt: '2020-04-10T10:00:00',
    })
    done()
  })

  it('Should get with parameters', async done => {
    const res = await request(app)
      .get('/')
      .query({ pageSize: 15, page: 3 })

    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(2)
    expect(res.body.pageSize).toBe(15)
    expect(res.body.currentPage).toBe(3)
    expect(res.body.pagesCount).toBe(1)
    expect(res.body.documents.length).toBe(2)
    expect(res.body.documents).toContainEqual({
          _id: '1',
          webPage: 'https://github.com/careers',
          company: { name: 'Github', province: 'PR' },
          jobRecruiter: { email: 'recruiter@github.com', linkedIn: 'recruiter-from-github' },
          createdAt: '2020-04-10T10:00:00',
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