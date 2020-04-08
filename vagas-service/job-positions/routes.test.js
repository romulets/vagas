const request = require('supertest')
const app = require('./routes.js')


describe('Get job positions', () => {
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
      createdAt: '2020-04-10T10:00:00'
    })

    done()
  })

  it('Should return errors', async done => {
    const res = await request(app)
      .post('/')
      .send({})

    expect(res.statusCode).toEqual(403)
    expect(res.body).toEqual({
      '_original': {},
      'details': [
        {
          'context': { 'key': 'webPage', 'label': 'webPage', },
          'message': '"webPage" is required',
          'path': ['webPage',],
          'type': 'any.required',
        },
        {
          'context': { 'key': 'company', 'label': 'company', },
          'message': '"company" is required',
          'path': ['company',],
          'type': 'any.required',
        },
        {
          'context': { 'key': 'jobRecruiter', 'label': 'jobRecruiter', },
          'message': '"jobRecruiter" is required',
          'path': ['jobRecruiter',],
          'type': 'any.required',
        },
      ],
    })

    done()
  })
})