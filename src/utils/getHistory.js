const request = require('request');

const getHistory = (country , callback) => {
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/history',
        qs: { country: country },
        json: true,
        headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': '00ed526595msh84088511b645257p1ca22ajsn57d426b949aa',
            useQueryString: true
        }
    };

    request(options, (error, response)=> {
        if (error) {
            callback("Please provide all the informations", undefined);
        }else{
            callback(undefined, response.body);
        }
    });
}

module.exports = getHistory;