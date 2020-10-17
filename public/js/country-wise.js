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
            }
        })
    })

    const confirmedCases = document.getElementById('confirmedCases').getContext('2d');
    const myChart1 = new Chart(confirmedCases, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Cofirmed',
                data: confirmed,
                // backgroundColor: 'rgba(255,7,58,.6)',
                borderColor: 'rgba(255, 7, 58, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    const activeCases = document.getElementById('activeCases').getContext('2d');
    const myChart2 = new Chart(activeCases, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Active',
                data: active,
                // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: '#007bff',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    const recoveredCases = document.getElementById('recoveredCases').getContext('2d');
    const myChart3 = new Chart(recoveredCases, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Recovered',
                data: recovered,
                // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: '#28a745',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    const deceasedCases = document.getElementById('deceasedCases').getContext('2d');
    const myChart4 = new Chart(deceasedCases, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Deceased',
                data: deceased,
                // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: '#6c757d',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    const testedCases = document.getElementById('testedCases').getContext('2d');
    const myChart5 = new Chart(testedCases, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Tested',
                data: tested,
                // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: '#9673b9',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}
fun();