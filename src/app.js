const path = require('path');
const hbs = require('hbs');
const express = require('express');
const getStatistics = require('./utils/getStatistics');
const getHistory = require('./utils/getHistory');
const getCountries = require('./utils/getCountries');

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

app.get('', (req, res)=>{
    getStatistics((error, { response })=> {
        if(error){
            res.render({
                error: error
            })
        }else{
            res.render('index', {response})
        }
    })
});

app.get('/corona/*', (req, res)=>{
    res.render('404page', {
        
    });
});

app.get('/state/*', (req, res)=>{
    res.render('state-detail', {

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