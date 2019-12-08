const BaseDB = require('../../base-lib').BaseDB,
_ = require('lodash'),
    enums = require('../../enum');

class UserDbAccessor extends BaseDB {
    constructor(dependencies) {
        super(dependencies);
        this.dependencies = dependencies;
        this.modelName = enums.models.users;
        this.model = this.dependencies.db[this.modelName];
        this.getUsers = this.getUsers.bind(this)
        this.getUser = this.getUser.bind(this);
        this.countUsers = this.countUsers.bind(this);
        this.createUser = this.createUser.bind(this);

    }
    async getUsers(params) {
        const me = this;
        let ids = _.get(params, 'ids', [])
        let options = _.isEmpty(ids) ? {} : { '_id': { $in: ids } };
            try {
                let response = await me.findIn(me.modelName, options);
                return response;
            } catch (e) {
                return e;
            }
      
    }
    async getUser(params) {
        try {
            let me = this;
            return await me.getOne(params)
        } catch (e) {
            throw e;
        }
    }

    async countUsers(params) {
        try {
            let me = this;
            return await me.count(params)
        } catch (e) {
            throw e;
        }
    }
    async createUser(payload) {
        const me = this;
 
        try {
            let response = await me.saveData(me.modelName, payload);
            return response;
        } catch (e) {
            return e;
        }
    }
}

module.exports = UserDbAccessor;