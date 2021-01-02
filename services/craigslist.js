const https = require('https');
fs = require('fs');
const { resolve } = require('path');

const get_vehicles = search_params => {
    return new Promise((resolve, reject) => {
        let url = 'https://saltlakecity.craigslist.org/search/cta?'  + ((search_params.miles) ? 'search_distance=' + search_params.miles : '')
        + ((search_params.zip) ? '&postal=' + search_params.zip : '')
        + ((search_params.priceFrom) ? '&min_price=' + search_params.priceFrom : '')
        + ((search_params.priceTo) ? '&max_price=' + search_params.priceTo : '')
        + ((search_params.make) ? '&auto_make_model=' + search_params.make + ((search_params.model) ? '+' + search_params.model : '') : '')
        + ((search_params.yearFrom) ? '&min_auto_year=' + search_params.yearFrom : '')
        + ((search_params.yearTo) ? '&max_auto_year=' + search_params.yearTo : '')
        + ((search_params.mileageFrom) ? '&min_auto_miles=' + search_params.mileageFrom : '')
        + ((search_params.mileageTo) ? '&max_auto_miles=' + search_params.mileageTo : '');

        console.log(url);
        https.get(url, (resp) => {
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
                resolve(data);
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