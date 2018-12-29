//---- dependencias ------  
'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const formidable = require('express-form-data');
const fileUpload = require('express-fileupload')

//---- dependencias ------
const config = require('./config');
const routes = require('./routes');

//---- app ------
const app = express();

//---- body parser------
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));

//---- CORS ------
app.use(cors());

//---- express-formidable (para las img) ------
//app.use(formidable.parse({keepExtensions: true}));

//----Agregar Archivos staticos (para las img)------
app.use("/files",express.static('files'));

//---Subidor de Archivos---
app.use(fileUpload())

//---- routes ----
app.use('/api',routes);

//---- correr servidor -----
app.listen(config.port, () => {
	console.log(`Api rest corriendo en http://localhost:${config.port}`);
})