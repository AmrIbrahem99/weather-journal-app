// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express()
app.use(cors())
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
}

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Post route
// app.post('/addTemp',addTemp)
// function addTemp(req,res){
//     projectData.push(req.body)
// }

app.post('/addData', addData);
function addData(request, response) {
    let data = request.body;
    console.log('server side data ', data)
    projectData["date"] = data.timezone;
    projectData["temp"] = data.main.temp;
    projectData["name"] = data.name;

    response.send(projectData);
}


// get route
app.get('/getData', getWetherData);
function getWetherData(req,res){
    console.log(projectData);
    res.send(projectData);
}
