//Standard Server

require("dotenv/config");
const path = require ("path");
const { default: axios } = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;  


//Einbindung von index.html als Startseite
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,"./index.html") );
});



app.get('/some-command', (req,res) =>{
    res.sendStatus(200);  //Sendet einen Status zurück
    console.log("some command"); //Printet etwas in der Console
});


//get request an eine url, bekommt json daten zurück, die auf der Webseite ausgegeben werden
app.get('/some-other', (req, res) => {
    axios.get ("https://jsonplaceholder.typicode.com/todos") //axios 
    .then(response => {
        res.json(response.data);
    })
    .catch(err => {
        console.error("An error occured.");
        console.error(err);
        res.sendStatus(500);
    })
})

//get time 
app.get('/time/:region/:city', (req, res) => {

    //Möglichkeit: /time?region=Europe&ciy=Berlin
    //const region = req.query.region;
    
    //2. Möglichkeit: in der URL
    const region =  req.params.region;
    const city = req.params.city;
    axios.get(`http://worldtimeapi.org/api/timezone/${region}/${city}/`)
    .then(response => {
        res.json(response.data);
        console.log("Time called",response.data.datetime);
    })
    .catch(err => {
        console.error("An error occured.");
        console.error(err);
        res.sendStatus(500);
    })
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
})


