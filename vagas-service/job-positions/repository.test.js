const repository = require('./repository.js')
const { openTestConnection, closeTestConnection } = require('../test-support/database.js')

describe('Save entity properly', () => {
  beforeAll(openTestConnection)
  afterAll(closeTestConnection)

  it('Should return valid', async () => {
    const jobPosition = {
      webPage: 'https://github.com/careers',
      company: { name: 'Github', province: 'PR' },
      isValid: true,
      jobRecruiter: { email: "recruiter@github.com", linkedIn: "recruiter-from-github" },
      createdAt: new Date("2019-12-02")
    }

    const result = await repository.save(jobPosition)


    expect(result).toEqual(jobPosition)
    expect(result._id).toBeTruthy()
  })
})

describe('Find valid job positions properly', () => {
  const documentA = { id: 'a', isValid: true, createdAt: new Date('2020-04-13') }
  const documentB = { id: 'b', isValid: true, createdAt: new Date('2020-04-14') }
  const documentC = { id: 'c', isValid: false, createdAt: new Date('2020-04-15') }
  const documentD = { id: 'd', isValid: true, createdAt: new Date('2020-04-12') }

  beforeAll(openTestConnection)
  beforeAll(async () => {
    await Promise.all(
      [ documentA, documentB, documentC, documentD ].map(repository.save)
    )
  })
  afterAll(closeTestConnection)

  it('Find all valid job positions after 2020-04-13', async () => {
      const results = await repository.findValidJobPositions(new Date('2020-04-13'))

      expect(results.currentPage).toBe(1)
      expect(results.pageSize).toBe(10)
      expect(results.pagesCount).toBe(1)
      expect(results.total).toBe(2)
      expect(results.documents.length).toBe(2)
      expect(results.documents).toContainEqual(documentA)
      expect(results.documents).toContainEqual(documentB)
  })

  it('Find first page of valid job positions after 2020-04-10', async () => {
    const results = await repository.findValidJobPositions(new Date('2020-04-10'), 2, 1)

    expect(results.currentPage).toBe(1)
    expect(results.pageSize).toBe(2)
    expect(results.pagesCount).toBe(2)
    expect(results.total).toBe(3)
    expect(results.documents.length).toBe(2)
    expect(results.documents).toContainEqual(documentA)
    expect(results.documents).toContainEqual(documentB)
  })

  it('Find second page of valid job positions after 2020-04-10', async () => {
    const results = await repository.findValidJobPositions(new Date('2020-04-10'), 2, 2)

    expect(results.currentPage).toBe(2)
    expect(results.pageSize).toBe(2)
    expect(results.pagesCount).toBe(2)
    expect(results.total).toBe(3)
    expect(results.documents.length).toBe(1)
    expect(results.documents).toContainEqual(documentD)
  })
  
})