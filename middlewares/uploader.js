const cloudinary = require('cloudinary');
'use strict'

//Variable de configuracion del servicio
cloudinary.config({ 
    cloud_name: 'digitalmarket', 
    api_key: '421773828929594', 
    api_secret: 'kyvOIAwfJ0OPO4sffT_woJ7TFQI' 
});

//funcion que sube el archivo
exports.uploader = function(file) {

    return new Promise(function(resolve, reject) {
        cloudinary.v2.uploader.upload_stream(function(error, result){
            if(error){
                reject('fallido')
            }else{
                resolve({error: false, url: result.url})
            }
        })
        .end(file.data);
    }).catch(function () {
        return {error: true}
    })
}
