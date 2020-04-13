const { MongoClient } = require('mongodb')

const connectionString = process.env.DATABASE_CONNECTION_STRING
const poolSize = process.env.DATABASE_CONNECTION_POOL_SIZE || 1
const dbName = process.env.DATABASE_NAME|| 'local'

const clientConfig = { poolSize: poolSize, useNewUrlParser: true, useUnifiedTopology: true }
var client = null
var db = null

module.exports = {
  async save(collectionKey, document){
    const collection = db.collection(collectionKey)
    const response = await collection.insertOne(document) 
    
    document._id = response.insertedId
  
    return document
  },

  async find(collectionName, {filters, options}) {
    filters = filters || {}
    options = options || {}
  
    const collection = db.collection(collectionName)
    return await collection.find(filters, options).toArray()
  },

  async count(collectionName, {filters, options}) {
    filters = filters || {}
    options = options || {}
  
    const collection = db.collection(collectionName)
    return await collection.countDocuments(filters, options)
  },

  async connect(alternativeConectionString, alternativeDbName) {
    console.info('Connecting to the database')
    client = new MongoClient(alternativeConectionString || connectionString, clientConfig)
    client.connect()
    db = client.db(alternativeDbName || dbName)
    console.info('Connected to the database successfully')
  },

  async close() {
    console.info('Closing connection to the database')
    await client.close()
    console.info('Connection to the database closed successfully')
  },
  isConnected: () => client.isConnected()
}