const express = require('express');
const Router = express.Router();
const customersModel = require('../customers/customersModel');
const config = require('../../../configString.json');
const Utils = require('../../../utils/Utils');

Router.post('/', async(req, res) => {
    try
    {
        let customer = {
            users : req.body.users,
            code : req.body.code,
            name : req.body.name,
            phoneNumber : req.body.phoneNumber,
            address : req.body.address,
            longitude : req.body.longitude,
            latitude : req.body.latitude,
            note : req.body.note,
            contact : req.body.contact
        }

        // if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await customersModel.createCustomer(customer);
            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else 
                res.send({ status : true, msg : config.THANH_CONG});
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.put('/', async(req, res) => {
    try
    {
        let customer = {
            _id : req.body._id,
            code : req.body.code,
            name : req.body.name,
            phoneNumber : req.body.phoneNumber,
            address : req.body.address,
            longitude : req.body.longitude,
            latitude : req.body.latitude,
            note : req.body.note,
            users : req.body.users,
            contact : req.body.contact
        }
        console.log(customer)

        // if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await customersModel.updateCustomer(customer);
            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else 
                res.send({ status : true, msg : config.THANH_CONG});
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.delete('/', async(req, res) => {
    try
    {
        if(!Utils.verifyLogin(req.query.idlogin, req.headers['token']))
        {
            res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        }
        else
        {
            let result = await customersModel.removeCustomer(req.query.id);
            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else 
                res.send({ status : true, msg : config.THANH_CONG});
        }
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.get('/', async(req, res) => {
    try
    {
        // if(!Utils.verifyLogin(req.query.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await customersModel.findCustomer(req.query.idlogin);

            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
            else if(result === {})
                res.send({status : false, msg : config.KHONG_CO_DU_LIEU, data : null});
            else
                res.send({ status : true, msg : config.THANH_CONG, data : result});
        //}
    }

    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.get('/all', async(req, res) => {
    try
    {
        // if(!Utils.verifyLogin(req.query.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await customersModel.findAllCustomer(req.query.idlogin);

            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
            else if(result === {})
                res.send({status : false, msg : config.KHONG_CO_DU_LIEU, data : null});
            else
                res.send({ status : true, msg : config.THANH_CONG, data : result});
        //}
    }

    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

module.exports = Router;