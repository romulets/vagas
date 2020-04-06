const express = require('express')

const app = express()

app
  .get('/', (_, res) => {
    res.send('GET /job-positions')
  })
  .post('/', (_, res) => {
    res.send('POST /job-positions')
  })


module.exports = app