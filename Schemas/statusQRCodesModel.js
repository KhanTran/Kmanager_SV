const mongoose = require('mongoose');
const statusQRCodesSchema = require('../Cores/statusQRCodesSchema');
let statusQRCodesModel = mongoose.model('statusQRCodes', statusQRCodesSchema, 'statusQRCodes');

const selectAllStatus = async({}) => {
    try
    {
        return await statusQRCodesModel.find({}).exec();
    }
    catch(err)
    {
        return null;
    }
}

module.exports = {
    selectAllStatus
}