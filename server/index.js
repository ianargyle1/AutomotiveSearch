const vehicle_api = require('./controllers/Vehicle_API_Controller');
const express = require('express');
const path = require('path');

const app = express();

const client_path = path.join(__dirname, '..', 'client', 'build')
app.use(express.static(client_path));

// Send index.html if the url is doesn't start with /api/
app.get(/^(?!\/api\/).+$/, (req, res) => {
    res.sendFile(path.join(client_path, 'index.html'));
});

app.get('/api/vehicles', vehicle_api.get_vehicles);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));