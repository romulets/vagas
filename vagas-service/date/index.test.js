const { subtractDays } = require('./index.js')

describe('Should subtract properly', () => {

  it('Should subtract 1 day', () => {
    const pastDate = subtractDays(new Date('2020-01-10 12:00:00'), 1)
    expect(pastDate).toEqual(new Date('2020-01-09 12:00:00'))
  }) 

  it('Should subtract 8 days', () => {
    const pastDate = subtractDays(new Date('2020-01-10 15:00:00'), 8)
    expect(pastDate).toEqual(new Date('2020-01-02 15:00:00'))
  })

  it('Should subtract 30 days', () => {
    const pastDate = subtractDays(new Date('2020-01-10 15:00:00'), 30)
    expect(pastDate).toEqual(new Date('2019-12-11 15:00:00'))
  })

})