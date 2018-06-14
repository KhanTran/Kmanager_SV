const express = require('express');
const Router = express.Router();
const statusSchemesModel = require('../Schemas/statusSchemesModel');
const schemeModel = require('../Schemas/schemesModel');
const config = require('../configString.json');
const Utils = require('../utils/Utils');

Router.get('/', async(req, res) => {
    try
    {
        if(!Utils.verifyLogin(req.query.idlogin, req.headers['token']))
        {
            res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        }
        else
        {
            let result = await statusSchemesModel.selectAllStatus({});
            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
            else 
                res.send({ status : true, msg : config.THANH_CONG, data : result});
        }
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
    }
});

Router.put('/', async(req, res) => {
    try
    {
            let result = await schemeModel.updateStatusScheme(req.body._id, req.body.status);
          
            res.send({ status : true, msg : config.THANH_CONG});
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
    }
});

module.exports = Router;