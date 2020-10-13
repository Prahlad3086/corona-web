const path = require('path');
const hbs = require('hbs');
const express = require('express');
const moment = require('moment');
const getStatistics = require('./utils/getStatistics');
const getStatisticsOfCountry = require('./utils/getStatisticsOfCountry');

const app = express()
const port = process.env.PORT || 3000

//Defined Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlers emgine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const NumberFormatter = (num)=>{
    if(num >= 1000 && num < 1000000){
        return (num/1000).toFixed(3) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num >= 1000000 && num < 1000000000){
        return (num/1000000).toFixed(3) + 'M'; // convert to M for number from > 1 million 
    }else if(num >= 1000000000){
	return (num/1000000000).toFixed(3) + 'B';
    }
    else if(num < 1000){
        return num; // if value < 1000, nothing to do
    }
}

app.get('', (req, res)=>{
    getStatistics((error, body)=> {
        const response = body.response;
        const dateTime = moment(body.response[0].time, moment.ISO_8601);

        const dateAndTime = dateTime.format("Do MMM, YYYY HH:mm A z");

        let RiseConfirmed=0, Confirmed=0, Active=0, Recovered=0, RiseDeaths=0, Deaths=0;

        for(let i=body.results-20;i<body.results;i++){
            if(response[i].population === null){
                var e = response[i];
                RiseConfirmed+=Number(e.cases.new);
                Confirmed+=Number(e.cases.total);
                Active+=Number(e.cases.active);
                Recovered+=Number(e.cases.recovered);
                RiseDeaths+=Number(e.deaths.new);
                Deaths+=Number(e.deaths.total);
            }
        }
        if(error){
            res.render({
                error: error
            });
        }else{
            res.render('index', {
                response,
                dateAndTime,
                RiseConfirmed: '+ '+NumberFormatter(RiseConfirmed),
                Confirmed: NumberFormatter(Confirmed),
                Active: NumberFormatter(Active),
                Recovered: NumberFormatter(Recovered),
                RiseDeaths: '+ '+NumberFormatter(RiseDeaths),
                Deaths: NumberFormatter(Deaths)
            });
        }
    })
});

app.get('/country', (req, res)=>{
    getStatisticsOfCountry('india', (error, { body })=> {
        const response = body.response;
        const dateTime = moment(body.response[0].time, moment.ISO_8601);
        const dateAndTime = dateTime.format("Do MMM, YYYY HH:mm A z");
        if(error){
            return res.render('404page', {

            })
        }

        res.render('country-detail', {
            countryName: response[0].country,
            dateAndTime,
            RiseConfirmed: '+ '+NumberFormatter(response[0].cases.new),
            Confirmed: NumberFormatter(response[0].cases.total),
            Active: NumberFormatter(response[0].cases.active),
            Recovered: NumberFormatter(response[0].cases.recovered),
            RiseDeaths: '+ '+NumberFormatter(response[0].deaths.new),
            Deaths: NumberFormatter(response[0].deaths.total),
            testedTotal: NumberFormatter(response[0].tests.total)
        });
    })
});

app.post('/country', function(req, res){
    if(!req.body.country){
        return res.render('404page', {

        })
    }

    getStatisticsOfCountry(req.body.country, (error, { body })=> {
        const response = body.response;
        const dateTime = moment(body.response[0].time, moment.ISO_8601);
        const dateAndTime = dateTime.format("Do MMM, YYYY HH:mm A z");
        if(error){
            return res.render('404page', {

            })
        }

        res.render('country-detail', {
            countryName: response[0].country,
            dateAndTime,
            RiseConfirmed: '+'+NumberFormatter(response[0].cases.new),
            Confirmed: NumberFormatter(response[0].cases.total),
            Active: NumberFormatter(response[0].cases.active),
            Recovered: NumberFormatter(response[0].cases.recovered),
            RiseDeaths: '+'+NumberFormatter(response[0].deaths.new),
            Deaths: NumberFormatter(response[0].deaths.total),
            testedTotal: NumberFormatter(response[0].tests.total)
        });
    })
});

app.get('/corona/*', (req, res)=>{
    res.render('404page', {
        
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {

    });
});

app.get('/about/*', (req, res)=>{
    res.render('404page', {
        
    });
});

app.get('*', (req, res)=>{
    res.render('404page', {
        
    });
});

app.listen(port,()=>{
    console.log("Server is up on "+port)
})