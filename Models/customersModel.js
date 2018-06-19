const mongoose = require('mongoose');
const customersSchema = require('../Schemas/customersSchema');
let customersModel = mongoose.model('customers', customersSchema);
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const usersSchema = require('../Schemas/usersSchema');
const usersModel = mongoose.model('users', usersSchema, 'users');
const users = require('../Models/usersModel');

const createCustomer = async (customer) => {
    try
    {
        return await customersModel.create(customer);
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const updateCustomer = async (customer) => {
    try
    {
        var id = customer._id;
        var queryUpdate = {
            code : customer.code,
            name : customer.name,
            phoneNumber : customer.phoneNumber,
            address : customer.address,
            longitude : customer.longitude,
            latitude : customer.latitude,
            note : customer.note,
            users : customer.users,
            contact : customer.contact
        }
    
        return await customersModel.findByIdAndUpdate(id, queryUpdate).exec();
    }
    catch(err)
    {
        return null;
    }
}

const removeCustomer = async(id) => {
    try
    {
        return await customersModel.remove({_id : id}).exec();
    }
    catch(err)
    {
        return null;
    }
}

const findCustomer = async(iduser) => {
    try
    {
        return await customersModel.find({users : iduser})
        .populate
        (
            {
                path : 'users',
                model : usersModel
            }
        ).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const findAllCustomer = async(iduser) => {
    try
    {
        return await customersModel.find({})
        .populate
        (
            {
                path : 'users',
                model : usersModel
            }
        ).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

module.exports = {
    createCustomer, updateCustomer, removeCustomer, findCustomer, findAllCustomer
}