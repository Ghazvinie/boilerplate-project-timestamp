// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  const date = new Date();
  res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
});

app.get('/api/:date', (req, res) => {
  // Get req date
  let reqDate = req.params.date;
console.log(reqDate.length)

  // Check if it is a number
  const isNum = parseInt(reqDate);
  console.log(isNum)
  let date;


  if (!isNaN(isNum)){
      // It is a number
    date = new Date(parseInt(reqDate));

    // Test if invalid
    if (date == 'Invalid Date'){
      res.json({ error: 'Invalid Date' });
      return;
    }

    // Send json
    res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  } else {

    // It is a string
    if (reqDate.length === 10){
      console.log('hi')
      reqDate = reqDate.split('-');
      date = new Date (reqDate[0], reqDate[1] - 1, reqDate[2]);
      res.json({ unix: date.valueOf(), utc: date.toUTCString() });
      return;
    }
    date = new Date(reqDate);

    // Test if invalid
    if (date == 'Invalid Date'){
      res.json({ error: 'Invalid Date' });
      return;
    }

    // Send json
    res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  }
});


// listen for requests :)
const listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
