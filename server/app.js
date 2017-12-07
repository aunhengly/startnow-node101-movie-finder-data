const express = require('express');
const axios = require('axios');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
let cache = [];

app.get('/', function (req, res) {
    const cachedValue = cache.find(obj => obj.url === req.originalUrl)
    if (cachedValue) {
        res.json(cachedValue.data);
    } else if (req.query.i) {
        axios.get('http://www.omdbapi.com/?i=' + req.query.i + '&apikey=8730e0e')
            .then(function (response) {
                cache.push({
                    url: req.originalUrl,
                    data: response.data
                })
                res.status(200).send(response.data);
            })
            .catch(function (error) {
                res.status(200).send(error);
            });
    } else if (req.query.t) {
        axios.get('http://www.omdbapi.com/?t=' + encodeURIComponent(req.query.t) + '&apikey=8730e0e')
            .then(function (response) {
                cache.push({
                    url: req.originalUrl,
                    data: response.data
                })
                res.status(200).send(response.data);
            })
            .catch(function (error) {
                res.status(200).send(error);
            })
    }
});

module.exports = app;