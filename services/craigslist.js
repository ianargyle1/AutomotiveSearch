const https = require('https');

const get_vehicles = search_params => {
    return new Promise((resolve, reject) => {
        let url = 'https://cars.ksl.com/search' + ((search_params.make) ? '/make/' + search_params.make : '')
        + ((search_params.model) ? '/model/' + search_params.model : '');
        https.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Parse and return the result.
            resp.on('end', () => {
                resolve({data: data});
            });

        }).on("error", (err) => {
            reject(err.message);
        });
    });
}

module.exports = {
    get_vehicles
}