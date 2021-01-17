/**
 * @file Index page for server, contains routes for API.
 * @author Ian Argyle
 */

const vehicle_api = require(__dirname + "/controllers/Vehicle_API_Controller");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const http = require("http");
const compression = require('compression');
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(compression()); //Compress all routes

// Attempt to get the users zip, set a cookie to save the zip.
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.autosearch_zip;
  if (cookie === undefined) {
    // no: set a new cookie
    http
      .get(
        "http://api.ipstack.com/146.86.111.50?access_key=" +
          process.env.IPSTACK_API_KEY,
        (resp) => {
          let data = "";

          // A chunk of data has been received.
          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            res.cookie("autosearch_zip", JSON.parse(data).zip, {
              maxAge: 172800,
            });
            next();
          });
        }
      )
      .on("error", (err) => {
        next();
      });
  } else {
    next();
  }
});

const client_path = path.join(__dirname, "..", "client", "build");
app.use(express.static(client_path));

// Send index.html if the url is doesn't start with /api/
app.get(/^(?!\/api\/).+$/, (req, res) => {
  res.sendFile(path.join(client_path, "index.html"));
});

// Vehicle API path
app.get("/api/vehicles", vehicle_api.get_vehicles);

const port = 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
