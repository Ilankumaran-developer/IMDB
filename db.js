const _ = require('lodash'),
    fs = require('fs'),
path = require('path')
Helper = require('./lib').Helper,
schema = require('./lib').schema,
mongoose = require('mongoose');

class Db {
    constructor(config) {
        this.config = config;
    }
    async createDB() {
        let me = this;
        try {
            let db = await me._createConnection()
            return db;
        } catch (e) {
            throw e;
        }
    }
 
    async _createConnection() {
        let me = this;
        try {
            let con = me.constructConnectionString();

            return new Promise((resolve, reject) => {
                try {

                    mongoose.connect(con, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
                        if (err)
                            reject(err)
                        const db = mongoose.connection;
                        db.on('error', console.error.bind(console, 'connection error:'));
                        db.once('open', function callback() {
                        });
                        let models = me.loadModels();
                        resolve(models);
                    })
                } catch (e) {
                    reject(e);
                }
            })
        } catch (e) {
            throw e;
        }
    }

    constructConnectionString(){
        try {
            let me = this;
            let str = '';
            let dbConfig = _.get(me.config, 'config_db');
            if (dbConfig.local)
                str = `${dbConfig.protocol}://${dbConfig.localhost}:${dbConfig.localport}/${dbConfig.database}`;
            else
                str = `${dbConfig.protocol}://${dbConfig.username}:${dbConfig.password}@ds121955.mlab.com:${dbConfig.port}/${dbConfig.database}`;
            return str;
        } catch (e) {
            throw e;
        }
    }

    loadModels() {
   
        let models = {};
        _.forEach(schema, (value, key) => {
            models[key] = mongoose.model(key, value);
        })
        return models
    }

}
module.exports = Db;