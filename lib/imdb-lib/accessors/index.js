'use strict';

const _ = require('lodash'),
enums = require('../../enum'),
UserDbAccessor = require('./user-db-accessor');

class DataAccessors {
    constructor(dependencies, model){
        this.model = model;
        this.dependencies = dependencies;
        return this.getModelFactory();
    }
    getModelFactory(){
        const me = this;
        try{
            if(!enums.models[me.model])
                throw new Error("Model cannot be found")
            switch(me.model){
                case "users":
                    return new UserDbAccessor(me.dependencies);
            
            }
        }catch(e){
            throw e;
        }
    }

}

module.exports = DataAccessors;