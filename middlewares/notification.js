var FCM = require('fcm-node');
var serverKey = 'AAAAi931xLw:APA91bGaIQ4uu2iaUJ1eHJX7zzfLDMpsU4qoghfaOD9xJxlUyyMjIF3wcq1YEbHBXRTE-pT1nIyrY851FuIUsT_5KPiHKTHawpDU047imRJE7U0yeczRxl43j18eLto9BvWgxqVJeo8r'; //put your server key here
var fcm = new FCM(serverKey);
 
exports.sender = function(dispositivos,titulo,mensaje){
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        registration_ids: dispositivos,
        priority: 'high',
        notification: {
            title: titulo, 
            body: mensaje ,
            sound: "default",
            color: '#5e2129'
        }
    };
    
    return new Promise(function(resolve, reject) {
        fcm.send(message, function(err, response){
            if (err) {
                reject(err)
            } else {
                var data = JSON.parse(response)
                resolve({error: false, sent: data.success})
            }
        });
    }).catch(function (err) {
        var data = JSON.parse(err)
        console.log(data)
        return {error: true, success: data.success, failure: data.failure}
    })
}
    