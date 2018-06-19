const mongoose = require('mongoose');
const menusSchema = require('../Schemas/menusSchema');
let menusModel = mongoose.model('menus', menusSchema);

const findMenusByGroup = async (idgroup) => {
    try
    {
       return await menusModel.find({groups : idgroup}).select('index mcode mname icon color').exec();
    }
    catch(err)
    {
        return null;
    }
}


module.exports = {
    findMenusByGroup
}