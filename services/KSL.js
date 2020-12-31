const https = require('https');

const get_vehicles = async (search_params) => {
    let url = 'https://cars.ksl.com/search' + (search_params.make) ? '/make/' + search_params.make : ''
            + (search_params.model) ? '/model/' + search_params.model : '';

    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Parse and return the result.
        resp.on('end', () => {
            return parse_data(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

const parse_data = (data) => {

}

module.exports = {
    get_vehicles
}