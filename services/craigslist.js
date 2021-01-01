const https = require('https');

const get_vehicles = search_params => {
    return new Promise((resolve, reject) => {
        let url = 'https://cars.ksl.com/search' + ((search_params.make) ? '/make/' + search_params.make : '')
        + ((search_params.model) ? '/model/' + search_params.model : '');
        // Build the post string from an object
        var post_data = JSON.stringify({
            "endpoint":"/classifieds/cars/search/searchByUrlParams",
            "options": {
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json",
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
                },
                "body":["perPage","96","page","1","make","Chevrolet","model","Camaro","yearFrom","2010","yearTo","2021","mileageFrom","1000","mileageTo","110000","priceFrom","1","priceTo","64000","includeFacetCounts","0","firstListingId","6735833","es_query_group","d61a8323-c5c7-4086-83ac-4595c66d5317"]
            }
        });

        // An object of options to indicate where to post to
        var post_options = {
            host: 'cars.ksl.com',
            path: '/nextjs-api/proxy?',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        let req = https.request(post_options, resp => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Parse and return the result.
            resp.on('end', () => {
                // console.log(data)
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            reject(err.message);
        });
        req.write(post_data);
        req.end();      
    });
}

module.exports = {
    get_vehicles
}