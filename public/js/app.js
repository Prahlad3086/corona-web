const searchButton = document.querySelector('#button-addon1');
const searchInput = document.querySelector('#search-country');

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();

    const country = searchInput.value;
    console.log(country);
    fetch('/country?country=india').then((response)=> {
        
    });
});