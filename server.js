
'use strict';
//const config = require('./config/connect.js');
const express    = require('express');        
const app        = express();                
const bodyParser = require('body-parser');
const logger 	   = require('morgan');
const router 	   = express.Router();
const port 	   = process.env.PORT || 8080;

var cors = require('cors')
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers");
    res.header("Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  

    next();
  });
app.use(cors());
app.use(logger('dev'));

require('./route.js')(router);
app.use('/api/v1', router);

app.listen(port);

console.log(`Server is running on ${port}`);