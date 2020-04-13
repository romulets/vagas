const { paginate, getPageInfo } = require('./index.js')

describe('Should paginate properly', () => {

  it('Should default values properly', () => {
    const pagination = paginate()
    expect(pagination).toEqual({ skip: 0, limit: 10})
  })

  it('Should retieve 1st page', () => {
    const pagination = paginate(50, 1)
    expect(pagination).toEqual({ skip: 0, limit: 50})
  })

  it('Should retieve 2nd page', () => {
    const pagination = paginate(20, 2)
    expect(pagination).toEqual({ skip: 20, limit: 20})
  })

  it('Should retieve 3rd page', () => {
    const pagination = paginate(15, 3)
    expect(pagination).toEqual({ skip: 30, limit: 15})
  })

  it('Should retieve 18th page', () => {
    const pagination = paginate(10, 18)
    expect(pagination).toEqual({ skip: 170, limit: 10})
  })

})

describe('Should retrieve page info properly', () => {
  it('Should default values properly', () => {
    const pageInfo = getPageInfo(-1, -1, -1)
    expect(pageInfo).toEqual({ total: 0, pageSize: 10, currentPage: 1, pagesCount: 0})
  })

  it('Should get page info for integer divisions', () => {
    const pageInfo = getPageInfo(70, 10, 3)
    expect(pageInfo).toEqual({ total: 70, pageSize: 10, currentPage: 3, pagesCount: 7})
  })

  it('Should get page info for float divisions', () => {
    const pageInfo = getPageInfo(3456, 15, 13)
    expect(pageInfo).toEqual({ total: 3456, pageSize: 15, currentPage: 13, pagesCount: 231})
  })

})