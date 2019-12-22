const iconElement = document.querySelector(".icon-container");
const tempElement = document.querySelector(".temp");
const country = document.querySelector(".location .country");
const city = document.querySelector(".location .city");
const notificationElement = document.querySelector(".notification");
const wind = document.querySelector(".wind");
const rain = document.querySelector(".rain");
var sunrise = document.querySelector(".sunrise");
var sunset = document.querySelector(".sunset");
// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273.00;
// API KEY
const key = "50e0a6906855302ba832fdea99f6bba4";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.innerHTML = "Browser doesn't Support Geolocation";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature = Math.round(data.main.temp - KELVIN);
            weather.iconId = data.weather[0].icon;
            weather.wind = data.wind.speed;
            weather.sunrise = data.sys.sunrise;
            weather.sunset = data.sys.sunset;
            weather.city = data.name;
            weather.rain = data.precipitation;
            weather.country = data.sys.country;

            var ssunrise = new Date(weather.sunrise*1000);
            var sunrisehours = ssunrise.getHours();
            var sunriseminutes = ssunrise.getMinutes();
            weather.sunrise = sunrisehours + ":" + sunriseminutes;

            var ssunset = new Date(weather.sunset*1000);
            var sunsethours = ssunset.getHours();
            var sunsetminutes = ssunset.getMinutes();
            weather.sunset = sunsethours + ":" + sunsetminutes;

            weather.rain = weather.rain + " mm";
            tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
        })
        .then(function(){
            displayWeather();
        });
}


// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    city.innerHTML = `${weather.city}`;
    country.innerHTML = `${weather.country}`;
    wind.innerHTML = `${weather.wind}`
    rain.innerHTML = `${weather.rain}`
    sunrise.innerHTML = `${weather.sunrise}`
    sunset.innerHTML = `${weather.sunset}`

}


