const request = require('supertest')
const app = require('./routes.js')


describe('Get job positions', () => {
  it('Should get successfullt', async done => {
    const res = await request(app)
      .get('/')
      
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual("GET /job-positions")
    done()
  })
})

describe('Post job position', () => {
  it('Should post successfullt', async done => {
    const res = await request(app)
      .post('/')
      
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual("POST /job-positions")
    done()
  })
})
