const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const usersSchema = new Schema({
   email : String,
   password : String,
   username : String
})



const load = {
    users: usersSchema
}

module.exports = load;