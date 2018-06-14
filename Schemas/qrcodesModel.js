const mongoose = require('mongoose');
const qrcodesSchema = require('./qrcodesSchema');
const qrcodesModel = mongoose.model('qrcodes', qrcodesSchema);
const statusQRCodesSchema = require('../Cores/statusQRCodesSchema');
const statusQRCodesModel = mongoose.model('statusQRCodes', statusQRCodesSchema, 'statusQRCodes');

const createQRCode = async(qrcode) => {
    try
    {
        let result = await qrcodesModel.find({code : qrcode.code}).exec();
        if(result.length == 0)
            return await qrcodesModel.create(qrcode);
        else
            return -1;
    }
    catch(err)
    {
        return 0;
    }
}

const findQRCodebyCode = async(code) => {
    try
    {
        return await qrcodesModel.findOne({code : code})
        .populate(
            {
                path : 'status',
                model : statusQRCodesModel
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

const updateQRCode = async(idQRCode, statusS) => {
    try
    {
        var id = idQRCode;
        var queryUpdate = {
            status : statusS
        }
    
        return await qrcodesModel.findByIdAndUpdate(id, queryUpdate).exec();
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

const removeQRCode = async(id) => {
    try
    {
        return await qrcodesModel.remove({_id : id}).exec();
    }
    catch(err)
    {
        console.log(err);
        return 0;
    }
}

const selectQRCodeByCode = (code, callback) => {
    qrcodesModel.findOne({code : code})
        .populate(
            {
                path : 'status',
                model : statusQRCodesModel
            }
        )
        .exec(function(err, doc) {
            callback(doc);
        });
}

const selectAllQRCode = (callback) => {
    qrcodesModel.find({})
        .populate(
            {
                path : 'status',
                model : statusQRCodesModel
            }
        )
        .exec(function(err, doc) {
            callback(doc);
        });
}

module.exports = {
    createQRCode, removeQRCode, findQRCodebyCode, updateQRCode, selectQRCodeByCode,
    selectAllQRCode
}