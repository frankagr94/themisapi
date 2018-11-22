const uuidv1 = require('uuid/v1');
const ruta = '/files/'
'use strict'

exports.uploader = function(tipo,file) {
    let archivo = file
    let nombre = archivo.name;
    let uniq_nomb = uuidv1();
    let ext = nombre.substr((Math.max(0, nombre.lastIndexOf(".")) || Infinity) + 1);
    let path = '.'+ruta+tipo+'/'+uniq_nomb+'.'+ext
    let url = ruta+tipo+'/'+uniq_nomb+'.'+ext

    return new Promise(function(resolve, reject) {
        archivo.mv(path,function(err) {
            if(err){
                reject('fallido')
            }else{
                resolve({error: false, url: url})
            }
        })
    }).catch(function () {
        return {error: true}
    })
}
