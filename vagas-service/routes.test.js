const request = require('supertest')
const app = require('./routes.js')


describe('Get root path', () => {
  it('Should verify that works', async done => {
    const res = await request(app)
      .get('/')
      
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual("It works!")
    done()
  })
})
