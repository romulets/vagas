const dotenv = require('dotenv')
dotenv.config()

const http = require('http')
const app = require('./routes.js')
const repository = require('./repository')
const { createTerminus } = require('@godaddy/terminus')

const portNumber = process.env.PORT || 3000
const server = http.createServer(app)

repository.connect()

async function onShutDown () {
  console.log('server is starting cleanup')
  repository.close()
}

async function onHealthCheck () {
  if (!repository.isConnected) {
    throw new Error('Database connection is not alive!')
  }
}

createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: { '/healthcheck': onHealthCheck },
  onShutDown,
  onSignal: onShutDown
})

server.listen(portNumber)