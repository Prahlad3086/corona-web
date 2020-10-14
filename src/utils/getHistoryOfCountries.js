const getHistory = require('./getHistory');
const moment = require('moment');
const express = require('express');

express().use(express.json);

const startMoment = moment().subtract(91, 'days');
const endMoment = moment();

const totalConfirmed = [];
const totalActive = [];
const totalRecovered = [];
const totalDeceased = [];
const totalTested = [];
const dates = [];

const getHistoryOfCountries = async (country, callback)=>{

    await getHistory(country, async (error, responseBody)=> {
        if(error){
            console.log(error);
        }else{
            const e = responseBody.response;
            while(startMoment.isBefore(endMoment, 'day')){
                const date = startMoment.format('YYYY-MM-DD');
                
                for(var j = 0; j<responseBody.results ; j++){
                    if(e[j].day === date){

                        totalConfirmed.push(e[j].cases.total);
                        totalActive.push(e[j].cases.active);
                        totalRecovered.push(e[j].cases.recovered);
                        totalDeceased.push(e[j].deaths.total);
                        totalTested.push(e[j].tests.total);
                        console.log(e[j].day);
                        break;
                    }
                }
                console.log(date);
                dates.push(date);
                startMoment.add(1, 'days');
            }

            const data = {
                totalConfirmed: totalConfirmed,
                totalActive: totalActive,
                totalRecovered: totalRecovered,
                totalDeceased: totalDeceased,
                totalTested: totalTested,
                dates: dates
            }

            return data;
        }
    });
}

module.exports = getHistoryOfCountries;