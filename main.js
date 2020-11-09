const api = {
     key: config.MY_KEY,
    base: 'https://api.openweathermap.org/data/2.5/'
};

var place = document.querySelector('.place');
var date = document.querySelector('.date');
var temp = document.querySelector('.temp');
var weather_el = document.querySelector('.weather');
var hi_lo = document.querySelector('.hi-lo');

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e){
    if(e.keyCode == 13)
    {
       if (searchbox.value !== "")
        {
            searchResults(searchbox.value);
            searchbox.value = "";
        }     
    }
}
function searchResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((res)=>res.json())
    .then(displayResults)
    .catch((err)=>console.log(err))
}

function displayResults(weather){
    console.log(weather);
    place.innerText = `${weather.name},${weather.sys.country}`;
    let showdate =  showDate();
    date.innerText = showdate;
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    weather_el.innerText = `${weather.weather[0].main}`;
    hi_lo.innerHTML = `${Math.round(weather.main.temp_max)}<span>°C</span>/${Math.round(weather.main.temp_min)}<span>°C</span>`;
 
}
function showDate(){
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let d = new Date();
    let month = months[d.getMonth()];
    let day = days[d.getDay()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}
