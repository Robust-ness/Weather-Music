var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var port = process.env.PORT || 8888
var request = require('request')

app.use(express.static(__dirname))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({extended: false}));



var client_id = 'f8b01c9bc9b34826a9afd72351987ae1'
var client_secret = 'c7aaea1cce8e4ff98e2b634d0eff6a2c'

var weather_key = ''



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
      console.log(req.body)
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/albums/41GuZcammIkupMPKH2OJ6I',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        res.send(body.tracks.items)
      });
    }
  });
})


var server = http.listen(port, () => {
    console.log("port is listening on port",  server.address().port)
})