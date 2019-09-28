'use strict'

const IPFS = require('ipfs');
const node = new IPFS();
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const compression = require('compression');
const routes = require('./app/routes');
const packageConfig = require('./package.json');

const app = express();

// Application-Level Middleware
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(awsServerlessExpressMiddleware.eventContext());


//Attach IPFS node to the request node
app.use(function (req, res, next) {
    req.node = node;
    next();
});

app.get('/', function (req, res) {
    res.json({
        status: "ok",
        service: {
            name: packageConfig.name,
            version: packageConfig.version
        },
        up_time: process.uptime() * 1000
    });
});

// Routes
app.use('/', routes);

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        success: false,
        message: err.message || 'An error occured.',
        errors: err.error || [],
    });
});

app.use((req, res) => {
    res.status(404).json({success: false, message: 'Resource not found.'});
});

var port = process.env.PORT || 3000;
// Creates and returns a ready to use instance of an IPFS node.
// IPFS instances are Node.js EventEmitters. You can listen for events by calling node.on('event', handler)
// See https://github.com/ipfs/js-ipfs#core-api
node.on('ready', () => {
    console.log("Started IPFS Node!");
    app.listen(port, () =>
        console.log("%s app listening on port %s", packageConfig.name, port)
    );
});

