const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schemesSchema = require('./schemesSchema');
const schemesModel = mongoose.model('schemes', schemesSchema, 'schemes');

const customersSchema = require('../customers/customersSchema');
const customersModel = mongoose.model('customers', customersSchema, 'customers');

const usersSchema = require('../users/usersSchema');
const usersModel = mongoose.model('users', usersSchema, 'users');
const users = require('../users/usersModel');

const schemeProductsSchema = require('../schemeProducts/schemeProductsSchema');
const schemeProductsModel = mongoose.model('schemeProducts', schemeProductsSchema, 'schemeProducts');
const schemeProducts = require('../schemeProducts/schemeProductsModel');

const productsSchema = require('../products/productsSchema');
const productsModel = mongoose.model('products', productsSchema, 'products');

const statusSchemesSchema = require('../statusSchemes/statusSchemesSchema');
const statusSchemesModel = mongoose.model('statusSchemes', statusSchemesSchema, 'statusSchemes');

const selectSchemeByIdUser = async(id) => {
    try
    {
        return await schemesModel.find(ObjectId(id))
        .populate
        (
            {
                path : 'customer',
                model : customersModel,
                populate : {
                    path : 'users',
                    model : usersModel,
                    select : 'fullname'
                }
            }
        )
        .populate
        (
            {
                path : 'user',
                model : usersModel,
                select : 'fullname'
            }
        )
        .populate
        (
            {
                path : 'schemeProducts',
                model : schemeProductsModel,
                populate : {path : 'product', model : productsModel}
            }
        )
        .populate
        (
            {
                path : 'status',
                model : statusSchemesModel
            }
        )
        .exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const selectSchemeAll = async(id) => {
    try
    {
        return await schemesModel.find({})
        .populate
        (
            {
                path : 'customer',
                model : customersModel,
                populate : {
                    path : 'users',
                    model : usersModel,
                    select : 'fullname'
                }
            }
        )
        .populate
        (
            {
                path : 'user',
                model : usersModel,
                select : 'fullname'
            }
        )
        .populate
        (
            {
                path : 'schemeProducts',
                model : schemeProductsModel,
                populate : {path : 'product', model : productsModel}
            }
        )
        .populate
        (
            {
                path : 'status',
                model : statusSchemesModel
            }
        )
        .exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const createScheme = async(scheme) => {
    try
    {
        let user = await users.selectUserForScheme(scheme.idlogin);
        if(user.group.isadmin)
        {
            scheme.schemeProducts = [];

            scheme.listProduct.forEach(async function(element, index, arr) {
                let result = await schemeProducts.createSchemeProduct({product : element.product, quantityDeploy : element.quantityDeploy});
                scheme.schemeProducts.push(result._id);

                if(index === arr.length - 1)
                {
                    await schemesModel.create(scheme);
                    return 1;
                }
            });

            return 1;
        }
        else
        {
            return 0;
        }
        
    }
    catch(err)
    {
        console.log(err);
        return -1;
    }
}

const findSchemeByIdSchemeProduct = async(id) => {
    try
    {
        return await schemesModel.find({schemeProducts : [id]})
        .populate({
            path : 'customer',
            model : customersModel
        })
        .exec();
    }
    catch(err)
    {
        return null;
    }
}

const selectSchemeByIdSchemeProduct = (id, callback) => {
    try
    {
        schemesModel.find({schemeProducts : [id]})
        .populate({
            path : 'customer',
            model : customersModel
        })
        .exec(function(err, doc) {
            callback(doc);
        });
    }
    catch(err)
    {
        return null;
    }
}

const updateStatusScheme = async(id, status) => {
    try
    {
        var id = id;
        var queryUpdate = {
            status : status
        }
    
        return await schemesModel.findOneAndUpdate(id, queryUpdate).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const updateScheme = async(id, scheme) => {
    try
    {
        await schemesModel.findByIdAndRemove(id).exec();
        await createScheme(scheme);
        return 1;
    }
    catch(err)
    {
        return -1;
    }
}
const removeScheme = async(id) => {
    try
    {
        return await schemesModel.remove({_id : id}).exc();
    }
    catch (err)
    {
        return null;
    }
}
module.exports = {
    selectSchemeByIdUser, createScheme, findSchemeByIdSchemeProduct, updateStatusScheme,
    selectSchemeByIdSchemeProduct,
    selectSchemeAll,
    updateScheme,
    removeScheme
}