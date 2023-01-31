//var button = $("button");
var cityTitle = document.querySelector('#cityTitle');
var table = $('.table');
var cityData = {};
var cityStateArr = [];


//city and state to be define by user input

const weatherLookup = function (event) {
  event.preventDefault();
  
  searchInputVal = document.querySelector("#result").value;
  cityStateArr = searchInputVal.split(", ");
  //console.log(cityStateArr);
  
  
  // var city = $(".input").val();
  // console.log(city);
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityStateArr[0] + ',' + cityStateArr[1] + ',US' +
    "&appid=7e8f7106e0004f7fac5f624653ef7dca&units=imperial"
    
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      current(data);
      cityData = data;
      console.log(cityData);
      forecastLookup(data.coord.lat, data.coord.lon);

      var container = $("#current");
      //data in console will have lat and long for city
      //then do string concat lat and long with what you get in the data object
      //fetch("https//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7e8f7106e0004f7fac5f624653ef7dca")
    });

  //fetch("https//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7e8f7106e0004f7fac5f624653ef7dca")
};
const forecastLookup = function (lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=7e8f7106e0004f7fac5f624653ef7dca&units=imperial"
  )
    .then(function (response) {
      //console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log(data.list);
      forecast(data);
    });
};
const current = function (data) {
  $("#name").text(data.name);
  $("#tempurature").text(data.main.temp);
  $("#wind").text(data.wind.speed);
  $("#humidity").text(data.main.humidity);
  //   saveSearch(data.name);
  console.log(data);
  cityTitle.textContent = data.name;
};

const forecast = function (data) {

  for(x = 0; x < data.list.length; x += 8){
    var dayHeader = $('#' + x);
    localTime = dayjs((data.list[x].dt + data.city.timezone) * 1000).format("MM/DD/YYYY");
    console.log(localTime);
    dayHeader[0].innerHTML = localTime;
    for(i = 0; i < 6; i++){
      var n = x + i + 1;
      var iconcode = data.list[n].weather[0].icon;
      var imgEl = $("<img id='wicon' src='http://openweathermap.org/img/w/" + iconcode + ".png' alt='Weather icon'>");
      var td = $("<td>");
      var linebreak = $("<br>");
      var tdContent = $('#TS' + i);
      td.text(data.list[n].weather[0].description);
      tdContent.append(td);
      if(data.list[n].weather[0].description === 'clear sky' || data.list[n].weather[0].description === "broken clouds" ||
      data.list[n].weather[0].description === "scattered clouds" ||
      data.list[n].weather[0].description === "few clouds"){
        td.append(linebreak);
        td.append(imgEl);
        td[0].style.backgroundColor = 'yellow';
      } else if(data.list[n].weather[0].description !== 'clear sky') {
        td[0].style.backgroundColor = 'gray';
       }
    }
  }

  // function weatherStats() {

  // }

  // var template = $(".forecast");
  // daysArray.forEach(function (day) {
  //   var localTime = dayjs((day.dt + data.city.timezone) * 1000).format(
  //     "MM/DD/YYYY"
  //   );

  };

  //***** Yelp API */
var lat = 44.05767274110839;
var long = -121.31572795673046;
var hours;
var barResults;

let yelpQueryURL =
  "https://morning-forest-62820.herokuapp.com/https://api.yelp.com/v3/businesses/search";
const yelpAPIKey =
  "OvqraNwLlNROU78GbI7ZocG6XKXRhYIKGby6JiTRzyOqjzUrjnVRThOlOtQSVIIN2dh0TWrttP0TtXJncUKu6sEKB4ywoOo-jAz1HjmDta069a2EQC1mvn37QGbPY3Yx";

$.ajax({
  url: yelpQueryURL,
  method: "GET",
  headers: {
    accept: "application/json",
    "x-requested-with": "xmlhttprequest",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${yelpAPIKey}`,
  },
  data: {
    latitude: lat,
    longitude: long,
    categories: "bars",
    open_at: 1675047600, //only works for the current week Monday-Sunday. problem on Yelp's end.
  },
}).then(function (res) {
  barResults = res;
  console.log(barResults);
});

$("#search").on("submit", weatherLookup);
