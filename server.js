require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
var axios = require("axios").default;
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'))

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

const apiKey = process.env.API_KEY

app.get("/news", (req, res) => {

  const query = req.query.search

  let options = {
    method: 'GET',
    url: `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`,

  };

  axios.request(options)
    .then(function (response) {
      res.json({ payload: response.data });
    })
    .catch(function (error) {
      res.json({ message: "Error!" });
    });

});

app.get("/country-news", (req, res) => {

  const query = req.query.search

  let options = {
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?country=${query}&apiKey=${apiKey}`,

  };

  axios.request(options)
    .then(function (response) {
      res.json({ message: "Hello from server!", payload: response.data });
    })
    .catch(function (error) {
      res.json({ message: "Error!" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});