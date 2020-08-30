
// SELECT ELEMENTS
const icon = document.querySelector(".div-image");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const locations = document.querySelector(".name");
const errors = document.querySelector(".error");


const key = "63dd3237fe179758fe46366d46b55fe8";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    errors.style.display = "block";
    errors.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    errors.style.display = "block";
    errors.innerHTML = `<p>Please turn on your Location</p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(displayResult);
}


