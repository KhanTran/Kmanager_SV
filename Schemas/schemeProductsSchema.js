const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const schemeProductsSchema = new Schema(
    {
        product : {type : ObjectId, require : true},
        quantityDeploy : {type : Number, require : true},
        quantityDeployed : {type : Number, require : true, default : 0},
        quantityRemaining : {type : Number, require : true, default : 0}
    }, {timestamps : {createAt : 'created_at', updateAt : 'updated_at'}}
);


module.exports = schemeProductsSchema;
