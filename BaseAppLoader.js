const _ = require("lodash"),
    bodyParser = require("body-parser"),
    Db = require("./db"),
    fs = require("fs"),
    cors = require('cors'),
    ServerRoutes = require('./lib').routes;

class BaseAppLoader extends Db {
    constructor(app, config) {
        super(config);
        this.app = app;
        this.dependencies = {};
    }
    async bootupApp() {
        let me = this;
        try {

            me._startApp();
            await me.UpdateDependencies();
            me.loadRoutes();
            me.dependencies.app.use(cors())

        } catch (e) {
            throw e;
        }
    }
    writeTempConfig() {

        try {

            let config = fs.readFileSync("./config.js");
            fs.writeFileSync("./src/config.js", config.toString());
        } catch (e) {
            throw e;
        }

    }
    loadRoutes() {
        let serverRoutes = new ServerRoutes(this.dependencies);
        serverRoutes.loadRoutes();
    }
    async UpdateDependencies() {
        let me = this;
        try {
            me.app.use(bodyParser.json());
            me.app.use(bodyParser.urlencoded({ extended: false }));
            me.dependencies.config = me.config;
            me.dependencies.db = await me.createDB();
            me.dependencies.app = me.app;
        } catch (e) {
            throw e;
        }
    }
    _startApp() {
        let me = this;
        try {
            me.app.listen(4004, () => {
                console.log("server started");
            });
        } catch (e) { }
    }
}

module.exports = BaseAppLoader;
