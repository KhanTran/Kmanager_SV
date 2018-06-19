const mongoose = require('mongoose');
const statusSchemesSchema = require('../Schemas/statusSchemesSchema');
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