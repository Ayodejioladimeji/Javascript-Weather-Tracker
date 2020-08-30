// Setting the date and time

const weekday = document.querySelector(".weekday");
const month = document.querySelector(".month");

const option = {
  weekday: "long"
};
const months = {
  month: "long",
  day: "numeric"
};

const today = new Date();
weekday.innerHTML = today.toLocaleDateString("en-US", option);
month.innerHTML = today.toLocaleDateString("en-US", months);

// The section that shows the time in 12 hours
function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var session = "AM";

  // if (h == 0) {
  //   h = 12;
  // }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s + "" + session;
  document.getElementById("time").innerHTML = time;
  // document.getElementById("time").textContent = time;

  setTimeout(showTime, 1000);
}

showTime();

const textInput = document.querySelector(".input");

textInput.addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    getResult(textInput.value);
    textInput.value = "";
  }
});

function getResult(query) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=63dd3237fe179758fe46366d46b55fe8&units=metric`
  )
    .then(weather => {
      return weather.json();
    })
    .then(displayResult);
}

function displayResult(weather) {
  let description = document.querySelector(".description");
  description.textContent = `${weather.weather[0].description}`;

  let country = document.querySelector(".country");
  country.textContent = `${weather.sys.country}`;

  let name = document.querySelector(".name");
  name.textContent = `${weather.name}`;

  let divImage = document.querySelector(".div-image");
  divImage.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`;

  let cloud = document.querySelector(".cloud");
  cloud.textContent = `${weather.weather[0].main}`;

  let temperature = document.querySelector(".temperature");
  temperature.textContent = `${Math.floor(weather.main.temp)}°`;

  let min = document.querySelector(".min-temp");
  min.textContent = `${weather.name} : ${weather.main.temp_min}°C`;

  let sunset = document.querySelector(".sunset");
  sunset.textContent = `${weather.name} : ${weather.sys.sunset}`;

  let max = document.querySelector(".max-temp");
  max.textContent = `${weather.name} : ${weather.main.temp_max}°C`;

  let sunrise = document.querySelector(".sunrise");
  sunrise.textContent = `${weather.name} : ${weather.sys.sunrise}`;
}
