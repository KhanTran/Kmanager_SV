const mongoose = require('mongoose');
const productsSchema = require('./productsSchema');
let productsModel = mongoose.model('products', productsSchema);

const createProduct = async(product) => {
    try
    {
        return await productsModel.create(product);
    }
    catch(err)
    {
        return null;
    }
}

const updateProduct = async(product) => {
    try
    {
        var id = product._id;
        var queryUpdate = {
            name : product.name,
            model : product.model,
            info : product.info
        }
    
        return await productsModel.findByIdAndUpdate(id, queryUpdate).exec();
    }
    catch(err)
    {
        return null;
    }
}

const removeProduct = async(id) => {
    try
    {
        return await productsModel.remove({_id : id}).exec();
    }
    catch(err)
    {
        return null;
    }
}

const selectProductForSchemeProducts = async(idProduct) => {
    try
    {
        return await productsModel.findOne({_id : idProduct}).select('name model').exec();
    }
    catch(err)
    {
        return null;
    }
}

const selectAllProduct = async() => {
    try
    {
        return await productsModel.find({}).exec();
    }
    catch(err)
    {
        return null;
    }
}

module.exports = {
    createProduct, updateProduct, removeProduct, selectProductForSchemeProducts,selectAllProduct
}