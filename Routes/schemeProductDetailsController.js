const express = require('express');
const moment = require('moment');
const Router = express.Router();
const schemeProductDetailsModel = require('../Schemas/schemeProductDetailsModel');
const schemeModel = require('../Schemas/schemesModel');
const config = require('../configString.json');
const Utils = require('../utils/Utils');

Router.post('/', async(req, res) => {
    try
    {
        let schemeProductDetail = {
            schemeProduct : req.body.schemeProduct,
            qrCode : req.body.qrCode,
            serial : req.body.serial,
            dateFrom : moment(req.body.dateFrom),
            dateTo : moment(req.body.dateTo),
            note : req.body.note
        }

        // if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        // {
        //     res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        // }
        // else
        // {
            let result = await schemeProductDetailsModel.createSchemeProductDetails(schemeProductDetail);
            if(result === -1)
                res.send({status : false, msg : config.QRCODE_KHONG_TON_TAI});
            else if(result === -2)
                res.send({status : false, msg : config.QRCODE_KHONG_KHA_DUNG});
            else
                res.send({ status : true, msg : config.THANH_CONG});
        //}
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.get('/', (req, res) => {
    try
    {
        let idlogin = req.query.idlogin || "";
        let idProduct = req.query.idproduct || "";
        let QRCode = req.query.qrcode || "";

        schemeProductDetailsModel.selectSchemeProductDetails(idProduct, QRCode, (doc) => {
            for (let i = 0; i < doc.length; i++) {
                console.log(doc.length);
                
                schemeModel.selectSchemeByIdSchemeProduct(doc[i].schemeProduct._id, (result) => {
                    doc[i].customer = {};
                    doc[i].customer = result;
                    if(i === doc.length - 1)
                    {
                        res.send({status : true, msg : config.THANH_CONG, data : doc});
                    }
                });
              
            }
        });
        
    }
    catch(err)
    {
        console.log(err);
        res.send({status : false, msg : config.KHONG_THANH_CONG, data : null});
    }
});

Router.put('/', async(req, res) => {
    try
    {
        let idlogin = req.query.idlogin || "";
        let idSchemeProductDetail = req.query.idschemeproductdetail || "";
        let QRCode = req.query.qrcode || "";

        let data = await schemeProductDetailsModel.replaceSchemeProductDetails(idSchemeProductDetail, QRCode);
        if(data !== null)
            res.send({status : true, msg : config.THANH_CONG});
        else
            res.send({status : false, msg : config.KHONG_THANH_CONG});

    }
    catch(err)
    {
        console.log(err);
        res.send({status : false, msg : config.KHONG_THANH_CONG, data : null});
    }
});

module.exports = Router;