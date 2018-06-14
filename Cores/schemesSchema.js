const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const schemesSchema = new Schema(
    {
        customer : {type : ObjectId, require : true},
        user : {type : ObjectId, require : true},
        schemeProducts : [{type : ObjectId, require : true}],
        status : {type : ObjectId, require : true},
        name : {type : String, required : true},
        fromDate :  {type : Date, required : true},
        toDate : {type : Date, required : true}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
    ,{
        toObject: {virtuals:true}
    }
);

module.exports = schemesSchema;
