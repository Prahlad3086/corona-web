const request = require('request');
const express = require('express');

const app = express();

app.use(express.json());

const getStatisticsOfCountry = (country, callback)=>{

    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics?country='+country,
        json: true,
        headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': '00ed526595msh84088511b645257p1ca22ajsn57d426b949aa',
            useQueryString: true
        }
    };

    request(options, (error, response)=> {
        if (error){
            callback("Unable to connect the API please wait...", undefined)
        }
        else{
            callback(undefined, response);
        }
    });
}

module.exports = getStatisticsOfCountry;