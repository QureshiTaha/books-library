const express = require('express');
const bodyParser = require('body-parser');
require('https').globalAgent.options.ca = require('ssl-root-cas').create();

const fs = require("fs");
const cors =require("cors");
const app = express();
const port = process.env.NODE_PORT || 5000;
const database = require('./Modules/config')
const routes = require("./routes");
var logger = require('morgan')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
API_PREFIX = process.env.API_PREFIX;
const http = require('http');


module.exports = {
  start: async () => {
    app.use(logger('dev'))
    app.use(logger('combined', {
      stream: fs.createWriteStream('./logs/access.log', { flags: 'a' })
    }));
    
    const corsOptions ={
      origin:'*', 
      credentials:true,            // access-control-allow-credentials:true
      optionSuccessStatus:200,
    }
    app.use(cors(corsOptions)) ;
   

    app.get('/', (req, res) => {
      res.json('Welcome to Books API!');
    });


    app.use(API_PREFIX, routes);
    var server = http.createServer(app);

    

    app.listen(port, () => {
      console.log('\x1b[32m%s\x1b[0m', `Node environment started listening on port:${port}`);     
    });
  }
}