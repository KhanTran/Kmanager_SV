const express = require('express');
const Router = express.Router();
const moment = require('moment');
const schemesModel = require('../schemes/schemesModel');
const config = require('../../../configString.json');
const Utils = require('../../../utils/Utils');

Router.get('/', async(req, res) => {
    try
    {
        // if(!Utils.verifyLogin(req.query.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await schemesModel.selectSchemeByIdUser(req.query.idlogin);
            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
            else 
                res.send({ status : true, msg : config.THANH_CONG, data : result});
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
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
            let result = await schemesModel.selectSchemeAll(req.query.idlogin);
            if(result === null)
                res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
            else 
                res.send({ status : true, msg : config.THANH_CONG, data : result});
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
    }
});

Router.post('/', async(req, res) => {
    try
    {
        let scheme = {
            name : req.body.name,
            idlogin : req.body.idlogin,
            user : req.body.user,
            customer : req.body.customer,
            listProduct : req.body.listProduct,
            fromDate : moment(req.body.fromdate),
            toDate : moment(req.body.todate),
            //schemeProducts = req.body.schemeProducts,
            status : "5a7d040efeb222491ae3399e" //Status Mới

        }
        // if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await schemesModel.createScheme(scheme);

            if(result === -1)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else if(result === 0)
                res.send({ status : true, msg : config.KHONG_THANH_CONG});
            else
                res.send({ status : true, msg : config.THANH_CONG});
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
    }
});

Router.put('/', async(req, res) => {
    try
    {
        let id = req.body._id;

        let scheme = {
            name : req.body.name,
            idlogin : req.body.idlogin,
            user : req.body.user,
            customer : req.body.customer,
            listProduct : req.body.listProduct,
            fromDate : moment(req.body.fromdate),
            toDate : moment(req.body.todate),
        }

            let result = await schemesModel.updateScheme(id, scheme);

            if(result === -1)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else if(result === 0)
                res.send({ status : true, msg : config.KHONG_THANH_CONG});
            else
                res.send({ status : true, msg : config.THANH_CONG});
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
    }
});

Router.delete('/', async(req, res) => {
    try
    {
        let id = req.body._id;


        let result = await schemesModel.updateStatusScheme(id, "5b100f78feb222491a854f17"); //trạng thái xóa

        res.send({ status : true, msg : config.THANH_CONG});
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
    }
});

module.exports = Router;