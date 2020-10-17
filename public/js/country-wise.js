const countryName = document.querySelector('#searchInput').value;

const confirmed = [];
const active = [];
const recovered = [];
const deceased  = [];
const tested = [];

const startMoment = moment().subtract(91, 'days');
const endMoment = moment().add(1, 'days');
const dates = [];

while(startMoment.isBefore(endMoment, 'day')){
    const date = startMoment.format('Do MMM, YYYY');
    dates.push(date);
    startMoment.add(1, 'days');
}

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

const fun = async ()=>{

    await fetch('/history?country='+countryName).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(error);
            }
            else{
                data.history.forEach((e)=>{
                    confirmed.push(e.cases.total);
                    active.push(e.cases.active);
                    recovered.push(e.cases.recovered);
                    deceased.push(e.deaths.total);
                    tested.push(e.tests.total);
                })
                myChart1.update();
                myChart2.update();
                myChart3.update();
                myChart4.update();
                myChart5.update();
            }
        })
    })

    const confirmedCases = document.getElementById('confirmedCases').getContext('2d');
    const myChart1 = new Chart(confirmedCases, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Cofirmed',
                data: confirmed,
                hoverBackgroundColor: 'rgba(255, 7, 58, 1)',
                backgroundColor: 'rgba(255, 7, 58, 0.345)',
                borderColor: 'rgba(255, 7, 58, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines:{
                        color: 'rgba(255, 7, 58, .234)'
                    },
                    ticks: {
                        beginAtZero: false,
                        color: 'rgba(255, 7, 58, .234)'
                    }
                }],
                xAxes: [{
                    gridLines:{
                        color: 'rgba(255, 7, 58, .234)'
                    },
                }]
            }
        }
    });

    const activeCases = document.getElementById('activeCases').getContext('2d');
    const myChart2 = new Chart(activeCases, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Active',
                data: active,
                hoverBackgroundColor: 'rgba(0, 123, 255, 1)',
                backgroundColor: 'rgba(0,123,255,.345)',
                borderColor: 'rgba(0, 123, 255, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines:{
                        color: 'rgba(0,123,255,.245)'
                    },
                    ticks: {
                        beginAtZero: false
                    }
                }],
                xAxes: [{
                    gridLines:{
                        color: 'rgba(0,123,255,.245)'
                    },
                }]
            }
        }
    });

    const recoveredCases = document.getElementById('recoveredCases').getContext('2d');
    const myChart3 = new Chart(recoveredCases, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Recovered',
                data: recovered,
                hoverBackgroundColor: 'rgba(40, 167, 69, 1)',
                backgroundColor: 'rgba(40,167,69,.345)',
                borderColor: 'rgba(40, 167, 69, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines:{
                        color: 'rgba(40,167,69,.245)'
                    },
                    ticks: {
                        beginAtZero: false
                    }
                }],
                xAxes: [{
                    gridLines:{
                        color: 'rgba(40,167,69,.245)'
                    },
                }]
            }
        }
    });

    const deceasedCases = document.getElementById('deceasedCases').getContext('2d');
    const myChart4 = new Chart(deceasedCases, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Deceased',
                data: deceased,
                hoverBackgroundColor: 'rgba(108, 117, 125, 1)',
                backgroundColor: 'rgba(108,117,125,.345)',
                borderColor: 'rgba(108, 117, 125, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines:{
                        color: 'rgba(108,117,125,.245)'
                    },
                    ticks: {
                        beginAtZero: false
                    }
                }],
                xAxes: [{
                    gridLines:{
                        color: 'rgba(108,117,125,.245)'
                    },
                }]
            }
        }
    });

    const testedCases = document.getElementById('testedCases').getContext('2d');
    const myChart5 = new Chart(testedCases, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Tested',
                data: tested,
                hoverBackgroundColor: 'rgba(150, 115, 185, 1)',
                backgroundColor: 'rgba(150,115,185,.433333)',
                borderColor: 'rgba(150, 115, 185, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines:{
                        color: 'rgba(150,115,185,.233333)'
                    },
                    ticks: {
                        beginAtZero: false
                    }
                }],
                xAxes: [{
                    gridLines:{
                        color: 'rgba(150,115,185,.233333)'
                    }
                }]
            }
        }
    });
}
fun();