const https = require('https');
fs = require('fs');
const { resolve } = require('path');

const get_vehicles = search_params => {
    return new Promise((resolve, reject) => {
        let url = 'https://cars.ksl.com/search' + ((search_params.make) ? '/make/' + search_params.make : '')
        + ((search_params.model) ? '/model/' + search_params.model : '');
        https.get('https://www.google.com', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Parse and return the result.
            resp.on('end', () => {
                // var regex = /data-listing='{[\s\S]*?}'/g;
                // var result = data.match(regex).map(function(val){
                //     return val.replace(/data-listing=/g,'').replace(/'/g,'').replace(/&quot;/g,'').replace(/"/g,'');
                // });
                resolve("");
            });

        }).on("error", (err) => {
            reject(err.message);
        });
    });
}

function parse_vehicles(script) {
    var result = script.match(/data-listing=(.*?)}"/g).map(function(val){
        return val.replace(/data-listing=/g,'').replace(/}"/g,'');
    });
    return result;
}

module.exports = {
    get_vehicles
}