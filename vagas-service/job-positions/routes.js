const express = require('express')
const jobPositionService = require('./service.js')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app
  .get('/', (_, res) => {
    res.json(jobPositionService.getJobPositions())
  })
  .post('/', (req, res) => {
    try {
      const jobPosition = req.body
      res.json(jobPositionService.addJobPoisition(jobPosition))
    } catch(e) {
      res.status(403).json(e)
    }
  })


module.exports = app