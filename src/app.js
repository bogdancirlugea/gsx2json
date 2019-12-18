var api = require('./api')

var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

const serverless = require('serverless-http')

var app = express()

var port = process.env.PORT || 5000

const router = express.Router()

app.use('/.netlify/functions/app', router)

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


router.get('/', (req,res)=>{
  res.send('<h1>Server is up! Hit the /api root to send your query</h1><p>Ex: /api?id=1hOIkY21AR0RwzJXxBBDaBfY3eUX0HkXtIIE0Cmkadug&sheet=1&columns=false</p>')
})


// get api
router.get('/api', api)

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(400).send(err.message)
});

// app.listen(port, function() {
//   console.log('GSX2JSON listening on port ' + port)
// })

module.exports.handler = serverless(app)