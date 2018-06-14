const express = require('express');
const Router = express.Router();
const qrcodesModel = require('../Schemas/qrcodesModel');
const config = require('../configString.json');
const Utils = require('../utils/Utils');

Router.post('/', async(req, res) => {
    try
    {
        let qrcode = {
            code : req.body.code,
            status : req.body.status
        }

        if(!Utils.verifyLogin(req.body.idlogin, req.headers['token']))
        {
            res.send({status : false, msg : config.MA_TOKEN_KHONG_DUNG});
        }
        else
        {
            let result = await qrcodesModel.createQRCode(qrcode);
            if(result === -1)
                res.send({status : false, msg : config.DA_TON_TAI});
            else if(result === 0)
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

Router.get('/', (req, res) => {
    try
    {
        let qrcode = req.query.qrcode || "";
        qrcodesModel.selectQRCodeByCode(qrcode, (doc) => {
            if(doc === null)
                res.send({status : false, msg : config.QRCODE_KHONG_TON_TAI});
            else if(doc.status.statusName !== 'Đã kích hoạt')
                res.send({status : false, msg : config.QRCODE_KHONG_KHA_DUNG});
            else
                res.send({status : true, msg : config.QRCODE_KHA_DUNG});
        });
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA});
    }
});

Router.get('/all', (req, res) => {
    try
    {
        qrcodesModel.selectAllQRCode((doc) => {
            if(doc === null)
                res.send({status : false, msg : config.KHONG_CO_DU_LIEU, data : null});
            else
                res.send({status : true, msg : config.THANH_CONG, data : doc});
        });
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
    }
});

Router.put('/', async(req, res) => {
    try
    {
        let result = await qrcodesModel.updateQRCode(req.query.idqrcode, req.query.idstatus);
            if(!result)
                res.send({status : false, msg : config.CO_LOI_XAY_RA});
            else
                res.send({status : true, msg : config.THANH_CONG});
    }
    catch(err)
    {
        res.send({status : false, msg : config.CO_LOI_XAY_RA, data : null});
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
            let result = await qrcodesModel.removeQRCode(req.query.id);
            if(result === -1)
            res.send({status : false, msg : config.KHONG_THE_XOA});
            else if(result === 0)
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

module.exports = Router;