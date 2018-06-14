const express = require('express');
const Router = express.Router();
const productsModel = require('./productsModel');
const config = require('../../../configString.json');
const Utils = require('../../../utils/Utils');

Router.post('/', async(req, res) => {
    try
    {
        let product = {
            name : req.body.name,
            model : req.body.model,
            info: req.body.info
        }

        // if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await productsModel.createProduct(product);
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
        let product = {
            _id : req.body._id,
            name : req.body.name,
            model : req.body.model,
            info : req.body.info
        }

        // if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await productsModel.updateProduct(product);
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
        // if(!Utils.verifyLogin(req.query.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await productsModel.removeProduct(req.query.id);
            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else 
                res.send({ status : true, msg : config.THANH_CONG});
       // }
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
            let result = await productsModel.selectAllProduct();
            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA, data : result});
            else 
                res.send({ status : true, msg : config.THANH_CONG, data : result});
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
    }
});



module.exports = Router;