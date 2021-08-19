//Standard Server

require("dotenv/config");
const path = require ("path");
const { default: axios } = require('axios');
const express = require('express');
const { response } = require("express");
const app = express();
const port = process.env.PORT || 3000;  


//Einbindung von index.html als Startseite
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,"./index.html") );
});

app.get('/timezones', (req, res) => {
    res.sendFile(path.join(__dirname,"./timezones.html") );
    axios.get('http://worldtimeapi.org/api/timezone')
    .then(response => {
        //res.json(response.data); -> Response an die webseite
        //Alle timezones auslesen
        for(var i = 0; i < 5; i++){   // eigentlich i < res.length
            console.log(response.data[i]);
            }
                
    })
});

app.get('/regions', (req, res) => {
    //show all regions
    res.sendFile(path.join(__dirname,"./timezones.html") );
    axios.get('http://worldtimeapi.org/api/timezone')
    .then(response => {
        var regions = [];
        const regex = /(.*\/)/;

        for (var i = 0; i < response.data.length; i++){
            let region;
            try{
                region= regex.exec(response.data[i])[0];
            }
            catch{region = response.data[i];}
            
            if(! regions.includes(region)){
                regions.push(region);
            }
        }
    console.log(regions);
    })
    
});

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


