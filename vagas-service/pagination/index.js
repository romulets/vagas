const DEFAULT_PAGE_SIZE = 10
const DEFAULT_CURRENT_PAGE = 1
const DEFAULT_TOTAL = 0

function fallbackValue(value, fallback) {
  if (!value) return fallback
  if (typeof value !== 'number') return fallback
  if (0 > value) return fallback
  return Math.floor(value)
}

module.exports = {
  paginate(pageSize, currentPage) {
    pageSize = fallbackValue(pageSize, DEFAULT_PAGE_SIZE)
    currentPage = fallbackValue(currentPage, DEFAULT_CURRENT_PAGE)

    return {
      skip: pageSize * (currentPage - 1),
      limit: pageSize
    }
  },

  getPageInfo(total, pageSize, currentPage) {
    console.debug('Page info', { total, pageSize, currentPage })

    total = fallbackValue(total, DEFAULT_TOTAL)
    pageSize = fallbackValue(pageSize, DEFAULT_PAGE_SIZE)
    currentPage = fallbackValue(currentPage, DEFAULT_CURRENT_PAGE)

    return {
      total,
      pageSize,
      currentPage,
      pagesCount: Math.ceil(total / pageSize)
    }
  }
}