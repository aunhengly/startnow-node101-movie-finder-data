const express = require('express');
const morgan = require("morgan");
const axios = require("axios");
const app = express();
const cache = {};
app.use(morgan("dev"));
app.get("/", function (req, res) {
    var movie =  req.query;
    var key = Object.keys(movie);
    var value = Object.values(movie);
     if(cache.hasOwnProperty(value)){
       res.json(cache[value]);   
   }else{  
    axios
        .get('http://www.omdbapi.com/?apikey=8730e0e&' + key + "=" + encodeURI(value))
        .then((response) => {
            cache[value] = response.data;
            res.send(response.data);
        })
        .catch(err => res.json(err.message))
    }
    });
module.exports = app;