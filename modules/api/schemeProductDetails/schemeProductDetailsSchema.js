const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const schemeProductDetailsSchema = new Schema(
    {
        schemeProduct : {type : ObjectId, require : true},
        qrCode : {type : ObjectId, required : true},
        serial : {type : String, require : true},
        dateFrom : {type : Date, required : true},
        dateTo : {type : Date, required : true},
        note : {type : String, default : ""},
        customer : {type : Object}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);

module.exports = schemeProductDetailsSchema;
