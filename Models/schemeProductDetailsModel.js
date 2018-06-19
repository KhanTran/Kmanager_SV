const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schemeProductDetailsSchema = require('../Schemas/schemeProductDetailsSchema');
const schemeProductDetailsModel = mongoose.model('schemeProductDetails', schemeProductDetailsSchema, 'schemeProductDetails');

const qrcodesSchema = require('../Schemas/qrcodesSchema');
const qrcodesModel = require('../Models/qrcodesModel');
const qrcodesMd = mongoose.model('qrcodes', qrcodesSchema, 'qrcodes');

const schemeProductsSchema = require('../Schemas/schemeProductsSchema');
const schemeProductsModel = require('../Models/schemeProductsModel');
const schemeProductsMd = mongoose.model('schemeProducts', schemeProductsSchema, 'schemeProducts');

const productSchema = require('../Schemas/productsSchema');
const productMd = mongoose.model('products', productSchema, 'products');

const schemesSchema = require('../Schemas/schemesSchema');
const schemesModel = require('../Models/schemesModel');

const createSchemeProductDetails = async(schemeProductDetail) => {
    try
    {
        //Kiểm tra QRCode
        let qrCode = await qrcodesModel.findQRCodebyCode(schemeProductDetail.qrCode);
        if(qrCode !== null && qrCode !== {})
        {
            //Nếu qrCode đã kích hoạt
            if(qrCode.status.statusName === "Đã kích hoạt")
            {
                schemeProductDetail.qrCode = qrCode._id;
                let result = await schemeProductDetailsModel.create(schemeProductDetail);
                if(result !== null)
                {
                    //Thay đổi trạng thái QRCode
                    await qrcodesModel.updateQRCode(qrCode._id, "5a7a6ee4feb222491ab93ef5"); // Đã gán
                    //Cộng số lượng đã gán
                    let schemeProduct = await schemeProductsModel.findSchemeProductById(schemeProductDetail.schemeProduct);
                    await schemeProductsModel.updateSchemeProduct(schemeProduct._id, parseInt(schemeProduct.quantityDeployed) + 1, parseInt(schemeProduct.quantityRemaining) - 1);

                    let scheme = await schemesModel.findSchemeByIdSchemeProduct(schemeProductDetailsModel.schemeProduct);
                    await schemesModel.updateStatusScheme(scheme._id, "5a7d042bfeb222491ae33ae3"); //Đang hoàn thành
                    if((schemeProduct.quantityRemaining - 1) === 0)
                    {
                        await schemesModel.updateStatusScheme(scheme._id, "5aceda1afeb222491ac92dcc"); //Đã hoàn thành
                    }

                    return 1;
                }
            }

            return -2; //QRCode không khả dụng
        }
        
        return -1; //Không tồn tại QRCode
    }
    catch(err)
    {
        console.log(err);

        return null;
    }
}

const replaceSchemeProductDetails = async(idSchemeProductDetail, QRCode) => {
    try
    {
        //Kiểm tra QRCode
        let qrCode = await qrcodesModel.findQRCodebyCode(QRCode);
        if(qrCode !== null && qrCode !== {})
        {
            //Nếu qrCode đã kích hoạt
            if(qrCode.status.statusName === "Đã kích hoạt")
            {
                //Lấy QR cũ
                let qrOld = await schemeProductDetailsModel.findById(idSchemeProductDetail).exec();
                let result = await schemeProductDetailsModel.findByIdAndUpdate(idSchemeProductDetail, {qrCode : qrCode._id}).exec();
                if(result !== null)
                {
                    //Thay đổi trạng thái QRCode
                    await qrcodesModel.updateQRCode(qrCode._id, "5a7a6ee4feb222491ab93ef5"); // Đã gán
                    //Thay đổi trạng thái QRCode cũ sang đã hủy
                    await qrcodesModel.updateQRCode(qrOld.qrCode, "5aa08d1ffeb222491a1bb670"); // Đã hủy

                    return 1;
                }
            }

            return -2; //QRCode không khả dụng
        }
        
        return -1; //Không tồn tại QRCode
    }
    catch(err)
    {
        console.log(err);

        return null;
    }
}

const selectSchemeProductDetails = (idProduct, QRCode, callback) => {
    console.log(QRCode);
    //Nếu lọc theo QRCode
    schemeProductDetailsModel.find({})
        .populate({
            path: 'schemeProduct',
            model: schemeProductsMd,
            populate : 
                {
                    path : 'product',
                    model: productMd
                }
          })
        .populate({
            path: 'qrCode',
            model: qrcodesMd
        })
        .exec(function(err, doc) {
            callback(doc);
        });
}


module.exports = {
    createSchemeProductDetails, selectSchemeProductDetails,
    replaceSchemeProductDetails
}