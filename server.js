const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configPort = process.env.PORT || 3001;
const config = require('./config.json');
const userApi = require('./Routes/usersController');
const customerApi = require('./Routes/customersController');
const groupApi = require('./Routes/groupsController');
const productApi = require('./Routes/productsController');
const qrcodeApi = require('./Routes/qrcodesController');
const statusQRCodeApi = require('./Routes/statusQRCodesController');
const schemeApi = require('./Routes/schemesController');
const statusSchemeApi = require('./Routes/statusSchemesController');
const schemeProductDetailApi = require('./Routes/schemeProductDetailsController');
var app = express();

app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));

app.use('/api/user', userApi);
app.use('/api/customer', customerApi);
app.use('/api/group', groupApi);
app.use('/api/product', productApi);
app.use('/api/qrcode', qrcodeApi);
app.use('/api/statusQRCode', statusQRCodeApi);
app.use('/api/scheme', schemeApi);
app.use('/api/statusScheme', statusSchemeApi);
app.use('/api/schemeProductDetail', schemeProductDetailApi);

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db success');
  }
})

app.listen(configPort , () => {
  console.log(`App listen on ${configPort}`);
})