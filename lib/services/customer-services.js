const UserManager = require("../manager/customer-manager");

class UserServices extends UserManager {
    constructor(dependencies) {
        super(dependencies);
        this.dependencies = dependencies;
        this.getCustomers = this.getCustomers.bind(this);
        this.addUser = this.addUser.bind(this);
       
    }
 
    async getCustomers(req, res) {

        let me = this;
        try {
            let result = await me.listCustomers(req.query);
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async addUser(req, res){
        let me = this;
        try {
            let result = await me.adduserData(req.body);
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    }
 
}
module.exports = UserServices;
