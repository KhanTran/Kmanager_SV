const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const productsSchema = new Schema(
    {
        name : {type : String, require : true},
        model : {type : String, require : true},
        info : {type: String, default : ""}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);

module.exports = productsSchema;