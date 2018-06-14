const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const customersSchema = new Schema(
    {
       users : [{type : ObjectId, require : true}],
       code : {type : String, require : true},
       name : {type : String, require : true},
       phoneNumber : {type : String, default : ""},
       address : {type : String, default : ""},
       longitude : {type : Number, default : 0},
       latitude : {type : Number, default : 0},
       note : {type : String, default : ""},
       contact : {type : String, default : ""}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);


module.exports = customersSchema;