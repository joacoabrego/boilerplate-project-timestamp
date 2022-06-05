// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res, done) => {
  try {
    if (!req.params.date) {
      req.params.date = new Date();
    }
    const unixInput = parseInt(req.params.date);
    const inputDate = unixInput
      ? new Date(unixInput)
      : new Date(req.params.date);
    if (inputDate instanceof Date && isFinite(inputDate)) {
      const unixTimestamp = inputDate.getTime();
      const utcString = `${inputDate.toUTCString()}`;
      res.json({
        unix: unixTimestamp,
        utc: utcString,
      });
    } else {
      res.send({
        error: "Invalid Date",
      });
    }
  } catch (error) {
    done(error, {
      error: "Invalid Date",
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
