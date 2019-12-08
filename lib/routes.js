const UserServices = require("../lib/services/customer-services"),
    cors = require("cors");


class ServerRoutes {
    constructor(dependencies) {
        this.dependencies = dependencies;
        this.userServices = new UserServices(this.dependencies);
       
    }
    loadRoutes() {
        let me = this;
        try {
            me.dependencies.app.get("/customer/list", cors(), this.userServices.getCustomers);
            me.dependencies.app.post("/customer/add", cors(), this.userServices.addUser)
        

        } catch (e) {
            throw e;
        }
    }
}
module.exports = ServerRoutes;
