const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const menusSchema = new Schema(
    {
        index : {type : Number, require : true},
        mcode : {type : String, require : true},
        mname : {type : String, require : true},
        screen : {type : String},
        icon : {type: String},
        color : {type : String},
        visiable : {type: Boolean}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);

module.exports = menusSchema;