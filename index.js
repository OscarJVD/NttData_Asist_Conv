//archivo index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cons = require('consolidate');

// view engine setup
const expressApp = express();

expressApp.engine('html', cons.swig);
expressApp.set("trust proxy", true);
// expressApp.set("view engine", "html");
expressApp.set("views", path.resolve(__dirname, "views"));
expressApp.use(express.static(path.join(__dirname, 'public')));
expressApp.use(express.static(path.join(__dirname, 'utils')));

https.createServer({
  cert: fs.readFileSync('localhost.crt'),
  key: fs.readFileSync('localhost.key')
}, expressApp).listen(50000, function () {
  console.log('Servidor https corriendo en el puerto 50000');
});

expressApp.get('/', function (req, res) {
  // res.send('Hola, estas en la pagina inicial');
  // console.log('Se recibio una petición get a través de https');
  res.render('index.html');
});

expressApp.get('/oscar', function (req, res) {
  res.send('Hola, estas en la pagina sdfsdfsdf');
  console.log('Se recibio una petición get a través de https');
});