const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/style.css", function (req, res) {
  res.sendFile(path.join(__dirname, "../style.css"));
});

app.get("/script.js", function (req, res) {
  res.sendFile(path.join(__dirname, "../script.js"));
});

app.get("/weather", async (req, res) => {
  const location = req.query.location;

  const API_Key = "7999ebbdf0964dc9943145145231310"
  const api = `http://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${location}&day=2&aqi=no&alerts=no`
    const weatherdata = fetch(api)
    weatherdata.then((response) => {
            return response.json()
        }).then((response) => {
            res.send(response)
        })
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
