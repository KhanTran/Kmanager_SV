const mongoose = require('mongoose');
const statusSchemesSchema = require('../Cores/statusSchemesSchema');
let statusSchemesModel = mongoose.model('statusSchemes', statusSchemesSchema);

const selectAllStatus = async({}) => {
    try
    {
        return await statusSchemesModel.find({}).exec();
    }
    catch(err)
    {
        return null;
    }
}

module.exports = {
    selectAllStatus
}