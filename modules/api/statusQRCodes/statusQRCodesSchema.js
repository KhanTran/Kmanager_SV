const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const statusQRCodesSchema = new Schema(
    {
        statusName : {type : String, require : true}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);

module.exports = statusQRCodesSchema;