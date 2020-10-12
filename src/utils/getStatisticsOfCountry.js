const request = require('request');

const getStatisticsOfCountry = (country, callback)=>{

    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics?country=india',
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
        }else if(response.body.error){
            callback("Sorry, We are not able to find this country. Please try another one.", undefined)
        }
        else{
            callback(undefined, response)
        }
    });
}

module.exports = getStatisticsOfCountry;