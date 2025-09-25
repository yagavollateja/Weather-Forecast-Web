import './App.css';
import React from 'react';
import searchIcon from './assets/search.png';
import calendarIcon from './assets/calendar.png';
import timeIcon from './assets/time.png';
import weatherIcon from './assets/weather.png';
import floodIcon from './assets/flood.png';
import windIcon from './assets/wind.png';
import hotIcon from './assets/hot.png';
import eyeIcon from './assets/eye.png';
import wind1Icon from './assets/wind-1.png';
import sunriseIcon from './assets/sunrise.png';
import moonIcon from './assets/moon.png';
function App() {
  //change the date formate
  function dateFormate(timeStamp){
    const date = new Date(timeStamp*1000);
    console.log(date.toUTCString());
    console.log(date.toLocaleString());
    return date.toLocaleString();
  }
//Fetch AQI Data
async function fetchAQI(lat,lon) {
  const fetchAQIData = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=ad685abce252416078f206348263da8c`)
  .then((res)=>res.json())
  .catch(error=>{
    alert(error.message);
    console.log(error.message);
  })
  console.log(fetchAQIData);
  let list = fetchAQIData.list[0].components;
  console.log(list);
  // eslint-disable-next-line no-undef
  $('#co')[0].innerText ="CO";
  // eslint-disable-next-line no-undef
  $('#coValue')[0].innerText = list.co;
  console.log(list.co);
  
  // eslint-disable-next-line no-undef
  $('#no2')[0].innerText ="NO2";
  // eslint-disable-next-line no-undef
  $('#no2Value')[0].innerText = list.no2;
  // eslint-disable-next-line no-undef
  $('#o3')[0].innerText ="O3";
  // eslint-disable-next-line no-undef
  $('#o3Value')[0].innerText = list.o3;
  // eslint-disable-next-line no-undef
  $('#so2')[0].innerText ="SO2";
  // eslint-disable-next-line no-undef
  $('#so2Value')[0].innerText = list.so2;

}
async function nextFiveDays(lat,lon) {
  const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ad685abce252416078f206348263da8c`)
  .then((res)=>res.json())
  .catch(error=>{
    alert(error.message);
    console.log(error.message);
  })
  console.log(data.list[0].dt_txt.split(" ")[0]);
  console.log(data);
  //Day 1
  let day1Date = data.list[0].dt_txt.split(" ")[0];
  let day1Temp = data.list[0].main.temp;
  // eslint-disable-next-line no-undef
  $('#day1Date')[0].innerText=day1Date;
  // eslint-disable-next-line no-undef
  $('#day1')[0].innerText=day1Temp;
  //Day 2
  let day2Date = data.list[8].dt_txt.split(" ")[0];
  let day2Temp = data.list[8].main.temp;
  // eslint-disable-next-line no-undef
  $('#day2Date')[0].innerText=day2Date;
  // eslint-disable-next-line no-undef
  $('#day2')[0].innerText=day2Temp;
  //Day 3
  let day3Date = data.list[16].dt_txt.split(" ")[0];
  let day3Temp = data.list[16].main.temp;
  // eslint-disable-next-line no-undef
  $('#day3Date')[0].innerText=day3Date;
  // eslint-disable-next-line no-undef
  $('#day3')[0].innerText=day3Temp;
  //Day 4
  let day4Date = data.list[24].dt_txt.split(" ")[0];
  let day4Temp = data.list[24].main.temp;
  // eslint-disable-next-line no-undef
  $('#day4Date')[0].innerText=day4Date;
  // eslint-disable-next-line no-undef
  $('#day4')[0].innerText=day4Temp;
  //Day 5
  let day5Date = data.list[32].dt_txt.split(" ")[0];
  let day5Temp = data.list[32].main.temp;
  // eslint-disable-next-line no-undef
  $('#day5Date')[0].innerText=day5Date;
  // eslint-disable-next-line no-undef
  $('#day5')[0].innerText=day5Temp;
  
}
const DataFetch=async()=>{
    // alert("Data fetch.....");
    let cityName = document.getElementsByClassName("inputfield")[0].value;
    if(cityName==""|| !cityName){
      alert("Please Enter City Name");
      return;
    }
    console.log(cityName);
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ad685abce252416078f206348263da8c&units=metric`)
    .then((res)=>res.json())
    .catch(error=>{
      alert("Please Enter valid City Name");
      console.log(error.message);
    })
    console.log(data.name);
    let responseCityName = data.name;
    let responseTemp =data.main.temp;
    let skyDescription =data.weather[0].description;
    console.log("Response CityName:",responseCityName);
    console.log("Response Temp:",responseTemp);
    console.log("Sky Description:",skyDescription);
    // document.getElementById("cityName").innerHTML=responseCityName;
    // document.getElementById("temperature").innerHTML=responseTemp;
    // document.getElementById("description").innerHTML=skyDescription;
    // eslint-disable-next-line no-undef
    $('#cityName')[0].innerText=responseCityName;
    // eslint-disable-next-line no-undef
    $('#temperature')[0].innerText=responseTemp;
    // eslint-disable-next-line no-undef
    $('#description')[0].innerText=skyDescription;
    let properDate = dateFormate(data.dt);
    // console.log(properDate);
    let date = properDate.split(",")[0];
    let time = properDate.split(",")[1];
    // eslint-disable-next-line no-undef
    $('#date')[0].innerText=date;
    // eslint-disable-next-line no-undef
    $('#time')[0].innerText=time;
    let sunrise =dateFormate(data.sys.sunrise);
    let sunset =dateFormate(data.sys.sunset);

    // eslint-disable-next-line no-undef
    $('#sunriseTime')[0].innerText=sunrise.split(',')[1];
    // eslint-disable-next-line no-undef
    $('#sunsetTime')[0].innerText=sunset.split(',')[1];
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    fetchAQI(lat,lon);
    nextFiveDays(lat,lon);
    let visibility = data.visibility;
    let humidity = data.main.humidity;
    let pressure = data.main.pressure;
    let feellike = data.main.feels_like;
    // eslint-disable-next-line no-undef
    $('#visibility')[0].innerText="Visibility";
    // eslint-disable-next-line no-undef
    $('#visibilityValue')[0].innerText=visibility;
    // eslint-disable-next-line no-undef
    $('#humidity')[0].innerText="Humidity";
    // eslint-disable-next-line no-undef
    $('#humidityValue')[0].innerText=humidity;
    // eslint-disable-next-line no-undef
    $('#pressure')[0].innerText="Pressure";
    // eslint-disable-next-line no-undef
    $('#pressureValue')[0].innerText=pressure;
    // eslint-disable-next-line no-undef
    $('#feellike')[0].innerText="Feels Like";
    // eslint-disable-next-line no-undef
    $('#feellikeValue')[0].innerText=feellike;


}
  return (
    <div className="body">
      <div className="searchBar">
        <div className="searchBarParentDiv">
          <input type="text" className="inputfield" placeholder="Search City"/>
          {/* 2. Use the imported variables in the src attribute */}
          <img src={searchIcon} alt="Search" width="35px" className="searchIcon" onClick={DataFetch}/>
          {/* This path might be okay if the image is in the public folder, but importing is better: */}
          {/* <img src="../public/assets/background.jpg"/> */}
          {/* If you can't import it, and it's in the public folder, use the root path: */}
        </div>
      </div>
      <div className="maincontainer">
        <div className="leftdiv ">
          <div className="currentTempDiv leftChild p-3 d-flex flex-column gap-2">
            {/* ... (rest of currentTempDiv) ... */}
            <h5 className="m-0" id="cityName">City Name</h5>
            <h5 className="temp m-0"><span id="temperature">0</span>&deg;C</h5>
            <h6 className="skyDescription m-0" id="description">Sky Description</h6>
            <hr/>
            <div className="date d-flex align-item-center gap-2">
              <img src={calendarIcon} alt="Calendar" width={20} height={20}/>
              <h6 className="dateText m-0">Date : <span id="date"></span></h6>
            </div>
            <div className="time d-flex align-item-center gap-2">
              <img src={timeIcon} alt="Time" width={20} height={20}/>
              <h6 className="timeText m-0">Time : <span id="time"></span></h6>
            </div>
          </div>
          <div className="nextFiveDays leftChild p-2 mt-2 d-flex flex-column">
              <h6 className="m-0" id="comingFiveDaysTitle">Coming 5 Days</h6>
              <div id="forecastContainer" className="d-flex flex-row gap-2 mt-2">
                <div className="cloud-child">
                  <img src={weatherIcon} alt="Weather" width={30}/>
                </div>
                <h6><span id="day1">0</span>&deg;C</h6>
                <h6>Sunday</h6>
                <h6 id="day1Date">2025-08-03</h6>
              </div>
              {/* ... (Repeat for day 2, 3, 4, 5 using {weatherIcon}) ... */}
               <div id="forecastContainer" className="d-flex flex-row gap-2 mt-2">
                 <div className="cloud-child">
                   <img src={weatherIcon} alt="Weather" width={30}/>
                 </div>
                 <h6><span id="day2">0</span>&deg;C</h6>
                 <h6>Sunday</h6>
                 <h6 id="day2Date">2025-08-03</h6>
               </div>
               <div id="forecastContainer" className="d-flex flex-row gap-2 mt-2">
                 <div className="cloud-child">
                   <img src={weatherIcon} alt="Weather" width={30}/>
                 </div>
                 <h6><span id="day3">0</span>&deg;C</h6>
                 <h6>Sunday</h6>
                 <h6 id="day3Date">2025-08-03</h6>
               </div>
               <div id="forecastContainer" className="d-flex flex-row gap-2 mt-2">
                 <div className="cloud-child">
                   <img src={weatherIcon} alt="Weather" width={30}/>
                 </div>
                 <h6><span id="day4">0</span>&deg;C</h6>
                 <h6>Sunday</h6>
                 <h6 id="day4Date">2025-08-03</h6>
               </div>
               <div id="forecastContainer" className="d-flex flex-row gap-2 mt-2">
                 <div className="cloud-child">
                   <img src={weatherIcon} alt="Weather" width={30}/>
                 </div>
                 <h6><span id="day5"> 0</span>&deg;C</h6>
                 <h6>Sunday</h6>
                 <h6 id="day5Date">2025-08-03</h6>
               </div>
          </div>
        </div>
        <div className="rightdiv d-flex flex-column justify-content-center align-items-center gap-3">
            <div className="rightrow rowone d-flex flex-row justify-content-between align-items-center">
              <div className="rowonechild humidity d-flex flex-row justify-content-center align-items-center gap-2">
                <img src={floodIcon} width={40} alt="Humidity Icon" />
                <div className="humiditychild">
                  <h6 className="text-center m-0 mt-2" id="humidity">Metric Name</h6>
                  <h6 className="text-center m-0 mt-1" id="humidityValue">Metric Value</h6>
                </div>
              </div>
              <div className="rowonechild pressure d-flex flex-row justify-content-center align-items-center gap-2">
                <img src={windIcon} width={40} alt="Pressure Icon" />
                <div className="pressurechild">
                  <h6 className="text-center m-0 mt-2" id="pressure">Metric Name</h6>
                  <h6 className="text-center m-0 mt-1" id="pressureValue">Mteric Value</h6>
                </div>
              </div>
              <div className="rowonechild feellike d-flex flex-row justify-content-center align-items-center gap-2">
                <img src={hotIcon} width={40} alt="Feels Like Icon" />
                <div className="feellikechild">
                  <h6 className="text-center m-0 mt-2" id="feellike">Metric Name</h6>
                  <h6 className="text-center m-0 mt-1" id="feellikeValue">Mteric Value</h6>
                </div>
              </div>
              <div className="rowonechild visibility d-flex flex-row justify-content-center align-items-center gap-2">
                <img src={eyeIcon} width={40} alt="Visibility Icon" />
                <div className="visibilitychild">
                  <h6 className="text-center m-0 mt-2" id="visibility">Metric Name</h6>
                  <h6 className="text-center m-0 mt-1" id="visibilityValue">Mteric Value</h6>
                </div>
              </div>
            </div>
            <div className="rightrow rowtwo d-flex flex-row justify-content-between align-items-center gap-3">
              <div className="rowtwochild airquality d-flex flex-column justify-content-start gap-1">
                  <h5 className="m-1 p-1">Air Quality Index (AQI)</h5>
                  <div className="Air-child mt-2 d-flex justify-content-around align-items-center">
                    <img src={wind1Icon} alt="AQI Icon" width={40} />
                    {/* ... (rest of AQI readings) ... */}
                    <div className="readings g-1">
                      <h6 className="m-0" id="co">AQI Metric</h6>
                      <h6 className="m-0" id="coValue">0</h6>
                    </div>
                    <div className="readings g-1">
                      <h6 className="m-0" id="so2">AQI Metric</h6>
                      <h6 className="m-0" id="so2Value">0</h6>
                    </div>
                    <div className="readings g-1">
                      <h6 className="m-0" id="o3">AQI Metric</h6>
                      <h6 className="m-0" id="o3Value">0</h6>
                    </div>
                    <div className="readings g-1">
                      <h6 className="m-0" id="no2">AQI Metric</h6>
                      <h6 className="m-0" id="no2Value">0</h6>
                    </div>
                  </div>
              </div>
              <div className="rowtwochild sunrise">
                <h5 className="m-2 p-2">Sunrise & Sunset</h5>
                <div className="sub-sunrise d-flex justify-content-around align-items-center">
                  <div className="sunrise-sunrise d-flex justify-content-center align-items-center gap-2">
                    <img src={sunriseIcon} alt="Sunrise Icon" width={60} />
                    <div className="sun-timing d-flex flex-column gap-1">
                      <h6 className="m-0">Sunrise</h6>
                      <h6 className="m-0"><span id="sunriseTime">06:00:00</span><span><br/>AM</span></h6>
                    </div>
                  </div>
                  <div className="sunrise-sunrise d-flex justify-content-center align-items-center gap-2">
                    <img src={moonIcon} alt="Sunset Icon" width={60} />
                    <div className="sun-timing">
                      <h6 className="m-0">Sunset</h6>
                      <h6 className="m-0"><span id="sunsetTime">06:00:00 </span><span><br/>PM</span></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightrow rowthree d-flex flex-column justify-content-between align-items-center">
              <h5 className="m-0 align-self-start p-1">Today</h5>
                <div className="rowchildParent  d-flex flex-row justify-content-evenly align-items-center gap-3">
                  <div className="rowthreechild child1 d-flex flex-column justify-content-center align-items-center">
                    <h6>06:00 PM</h6>
                    {/* Public assets must start with a forward slash / */}
                    <img src={weatherIcon} alt="cloudy" width={40} />
                    <h6 className="degrees">34.5&deg;C</h6>
                  </div>
                  <div className="rowthreechild child2">
                    <h6>06:00 PM</h6>
                    <img src={weatherIcon} alt="cloudy" width={40} />
                    <h6 className="degrees">34.5&deg;C</h6>
                  </div>
                  <div className="rowthreechild child3">
                    <h6>06:00 PM</h6>
                    <img src={weatherIcon} alt="cloudy" width={40} />
                    <h6 className="degrees">34.5&deg;C</h6>
                  </div>
                  <div className="rowthreechild child4">
                    <h6>06:00 PM</h6>
                    <img src={weatherIcon} alt="cloudy" width={40} />
                    <h6 className="degrees">34.5&deg;C</h6>
                  </div>
                  <div className="rowthreechild child5">
                    <h6>06:00 PM</h6>
                    <img src={weatherIcon} alt="cloudy" width={40} />
                    <h6 className="degrees">34.5&deg;C</h6>
                  </div>
                  <div className="rowthreechild child6">
                    <h6>06:00 PM</h6>
                    <img src={weatherIcon} alt="cloudy" width={40} />
                    <h6 className="degrees">34.5&deg;C</h6>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App;