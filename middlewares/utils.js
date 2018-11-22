'use strict'

exports.fecha = function(){
    let aux = new Date();
    let fecha = aux.getDate()+'-'+(aux.getMonth()+1)+'-'+aux.getFullYear()
    return fecha
}

exports.fechaConHora = function(){
    let aux = new Date();
    let fecha = aux.getDate()+'-'+(aux.getMonth()+1)+'-'+aux.getFullYear()+' a las '+
                aux.getHours()+':'+aux.getMinutes()+':'+aux.getSeconds();
    return fecha
}