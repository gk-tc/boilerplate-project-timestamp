// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// microservice 
app.get("/api/:date", function(req, res) {
  let ts = Number(req.params.date);
  // check if the parameter is a timestamp
  if (isNaN(ts)){
    ts = req.params.date;
  }
  
  let date = new Date(ts);
  // check if it's a valid date
  if (isNaN(date.valueOf())) {
    res.json({ error: date.toString() });
  } else {
    res.json({ unix: Date.parse(date), utc: date.toUTCString() });
  }
});


app.get("/api", function(req, res) {
  let date = new Date();
  res.json({ unix: Date.parse(date), utc: date.toUTCString() });
});