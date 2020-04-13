const repository = require('../repository')
const { paginate, getPageInfo } = require('../pagination')

const COLLECTION_KEY = 'job-positions'

module.exports = {
  async save(jobPosition) {
    return await repository.save(COLLECTION_KEY, jobPosition)
  },

  async findValidJobPositions(dateLimit, pageSize, currentPage) {
    const filters = {
      createdAt: { $gte: dateLimit },
      isValid: { $eq: true },
    }
    
    const jobPositionsCount = await repository.count(COLLECTION_KEY, { filters })

    const pagination = paginate(pageSize, currentPage)
    jobPositions = await repository.find(COLLECTION_KEY, {
      filters,
      options: pagination
    })

    const pageInfo = getPageInfo(jobPositionsCount, pageSize, currentPage)
    
    return {
      ...pageInfo,
      documents: jobPositions
    }
  }
}