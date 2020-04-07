const app = require('./routes.js')

const portNumber = process.env.PORT || 3000

app.listen(portNumber, () => console.log(`Started vagas-services on port :${portNumber}`))