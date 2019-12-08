const _ = require("lodash"),
    randomstring = require("randomstring"),
    md5 = require("md5"),
    enums = require("../enum"),
    DataAccessors = require('../imdb-lib').DataAccessors;


class CustomerManager {
    constructor(dependencies) {
        this.dependencies = dependencies;
        this.UserDbAccessor = new DataAccessors(this.dependencies, enums.models.users);
    }


    async listCustomers(payload) {
        let me = this;
        try {
            let result = await me.UserDbAccessor.getUsers(payload);
            return result
        } catch (e) {

            throw e;
        }
    }

    async adduserData(payload) {
        const me = this;
        try {
            return await me.UserDbAccessor.createUser(payload)
        } catch (e) {
            throw e;
        }
    }



}

module.exports = CustomerManager;