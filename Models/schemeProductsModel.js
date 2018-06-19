const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schemeProductsSchema = require('../Schemas/schemeProductsSchema');
const schemeProductsModel = mongoose.model('schemeProducts', schemeProductsSchema, 'schemeProducts');


const createSchemeProduct = async(schemeProduct) => {
    try
    {
        return await schemeProductsModel.create(schemeProduct);
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const findSchemeProductById = async(id) => {
    try
    {
        return await schemeProductsModel.findById({_id : id}).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const updateSchemeProduct = async(id, quantityDeployed, quantityRemaining) => {
    try
    {
        var id = id;
        var queryUpdate = {
            quantityDeployed : quantityDeployed,
            quantityRemaining : quantityRemaining
        }

        return await schemeProductsModel.findByIdAndUpdate(id, queryUpdate).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}


module.exports = {
    createSchemeProduct, findSchemeProductById, updateSchemeProduct
}