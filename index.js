const vehicle_api = require('./controllers/Vehicle_API_Controller');
const express = require('express');

const app = express();
// const api = new Vehicle_API();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/vehicles', vehicle_api.get_vehicles);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));