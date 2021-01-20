# AutomotiveSearch

View the live demo [here.](https://multi-auto-search.herokuapp.com/) (May be slow, hosted using a free service)

## About the Project
This is an attempt to make searching for new/used cars and trucks easier and faster. It's not completely finished yet, but the goal of this website is to make it easy and fast to get all the information you would want before buying a car. Currently, the website search KSL Cars and Autotrader (more planned for the future), the only extra information provided by the website is the fair market value for each vehicle. Although this is a good start (it saves you from needing to look it up yourself), I want to take it much further. Eventually, for each vehicle, I would like to show fair market value, an estimated depreciation curve, estimated cost to own, estimated monthly payment (for a typical auto loan), and an indicator showing if the vehicle has damage history. This is all possible via asynchronous API requests, I just don't have the time to implement it at the moment.

## Known Issues
I have every intention of fixing all the issues listed below. However, I am a college student and I don't have much free time.
* If no search results are found, "Loading..." will show forever.
* The live demo version (on Heroku) only searches KSL Cars as Autotrader blocks API requests from Heroku's servers.
* There is no validity check for the year, mileage, and price textboxes.

## Implementation Details
There are two main sections, client and server. Server runs on the server via node.js and express. It handles API requests from the client and is responsible for serving the React app from the client folder. Client is a React app that relies on the server side API for correctly formatted data.
