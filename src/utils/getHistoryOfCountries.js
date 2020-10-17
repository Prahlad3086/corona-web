const getHistory = require('./getHistory');
const moment = require('moment');

const startMoment = moment().subtract(91, 'days');

const history = [];

const getHistoryOfCountries = async (country, callback)=>{

    await getHistory(country, (error, body)=> {
        if(error){
            callback(error, undefined);
        }else{
            body.response.reverse().forEach(e =>{
                if(e.day === startMoment.format('YYYY-MM-DD')){
                    history.push(e);
                    startMoment.add(1, 'days');
                }
            });
            callback(undefined, history);
        }
    });
}

module.exports = getHistoryOfCountries;