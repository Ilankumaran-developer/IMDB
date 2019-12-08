const express = require('express'),
    app = express(),
    BaseAppLoader = require('./BaseAppLoader'),
    config = require('./config');


const baseAppLoader = new BaseAppLoader(app, config);
baseAppLoader.bootupApp();