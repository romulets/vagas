const express = require('express')
const jobPositionService = require('./service.js')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.set('trust proxy', true)

app
  .get('/', (_, res) => {
    res.json(jobPositionService.getJobPositions())
  })
  .post('/', async (req, res) => {
    try {
      const jobPosition = req.body
      const ip = req.connection.remoteAddress || req.ip || req.header('x-forwarded-for')
      const headers = {...req.headers, ip }
      const result = await jobPositionService.addJobPoisition(jobPosition, headers)
      res.json(result)
    } catch(e) {
      console.error(e)
      res.status(406).json({error: e.message, ...e})
    }
  })


module.exports = app