var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var port = process.env.PORT || 8888
var request = require('request')

app.use(express.static(`${__dirname}/dist`))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({extended: false}));

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}



var client_id = 'f8b01c9bc9b34826a9afd72351987ae1'
var client_secret = 'c7aaea1cce8e4ff98e2b634d0eff6a2c'

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.alloc(65, client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};
  

app.all('/messages', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.address);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

app.get('/messages', (req, res) =>{
  res.send({'nice try': 'asshole'})
})

app.post('/messages', (req, res) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      //console.log(req.body)
      let weatherCode = String(req.body.code).match(/^3|^5/) ? '66hINrwVnrGrdm3sbMqHq6' : String(req.body.code).match(/^2/) ? '3WwVfwBMuz3R1vQCBBh0qV' : String(req.body.code).match(/^6/) ? '3q1hM4NnaSCwYX3cLfYrvg' : String(req.body.code).match(/^7/) ? '76UlDuuUb0UzNO7jMDGiBD' : String(req.body.code).match(/^800/) ? '5xaRgm2h5QRP5iwYfeR7eY' : String(req.body.code).match(/^8/) ? '2gkr95xD5WM5TfPLSLAUyZ' : 'unknown'
      var token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/playlists/${weatherCode}`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      }
      request.get(options, function(error, response, body) {
        res.send(body.tracks.items[getRandomIntInclusive(0, body.tracks.items.length - 1)].track);
      })
    }
  })
})
  



var server = http.listen(port, () => {
    console.log("port is listening on port",  server.address().port)
})