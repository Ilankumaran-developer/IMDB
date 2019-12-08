

const schema = require('./schema/schema'),
ServerRoutes = require('./routes');
module.exports = {
    Helper: require('./helpers/base-helper'),
    schema : schema,
    routes: ServerRoutes
}