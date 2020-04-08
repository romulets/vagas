const { validate } = require('./entity.js')


describe('Validate entity properly', () => {
  it('Should return valid', () => {
    const entity = {
      webPage: 'https://github.com/careers',
      company: { name: 'Github', province: 'PR' },
      jobRecruiter: { email: "recruiter@github.com", linkedIn: "recruiter-from-github" }
    }

    const validationResult = validate(entity)
    expect(validationResult.value).toEqual(entity)
  })

  it('Should trim spaces and unknown properties', () => {
    const entity = {
      unknown: "unknown",
      webPage: 'https://github.com/careers   ',
      company: { name: 'Github', province: 'PR' },
      jobRecruiter: { email: "recruiter@github.com    ", linkedIn: "recruiter-from-github  " }
    }

    const validationResult = validate(entity)
    expect(validationResult.value).toEqual({
      webPage: 'https://github.com/careers',
      company: { name: 'Github', province: 'PR' },
      jobRecruiter: { email: "recruiter@github.com", linkedIn: "recruiter-from-github" }
    })
  })

  it('Should give back error messages', () => {
    const validationResult = validate({})
    expect(validationResult.error).toBeTruthy()
  })
})