import React, { useState, useEffect, useRef } from "react";
import "../schedule.css";
import { FaChevronDown, FaMapMarkerAlt } from "react-icons/fa";
import axios from 'axios';

const Schedule = () => {
  let celsiusTemperature = null;
  const celsiusLink = useRef();
  const fahrenheitLink = useRef();
  const currentLocationButton = useRef();
  const [city, setCity] = useState("Jaipur");

  // fuction to get hour
  function hourNow(response) {
    let now = new Date();
    let h2 = document.querySelector("h2.hour");
    let h3 = document.querySelector("h3.date");
    let hours = now.getHours();
    let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[now.getDay()];
   
  }

  // function to get days of the week to be returned
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["S", "M", "T", "W", "T", "F", "S"];

    return days[day];
  }


  // fuction main 1 display Forecast for next 5 days min and max
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="col-sm-9">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML = forecastHTML +
          `<div class="row row-8">
  <div class="col-3 col-sm-2">
    <p class="date1">
      ${formatDay(forecastDay.dt)}
    </p>
  </div>
  <div class="col-4 col-sm-2">
    <img 
      src ="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
  </div>
  <div class="col-5 col-sm-2">
    <p id="first-max-temp">
      ${Math.round(forecastDay.temp.max)}º
    </p>
  </div>
  <div class="col-6 col-sm-4">
    <p class="scale1">
      <hr />
    </p>
  </div>
  <div class="col-7 col-sm-2">
    <p id="first-min-temp">
     ${Math.round(forecastDay.temp.min)}º
    </p>
  </div>`;
      }

      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML
    }
    );
    displayHourly(response);
  }

  function formatAMPM(UNIX_timestamp) {
    let date = new Date(UNIX_timestamp * 1000);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  }


  // fuction main 1 display Hourly for next 5 days min and max
  function displayHourly(response) {
    let hourlyElement = document.querySelector("#hourly");

    let hourlyHTML =
      `<div class="row row-bottom">
  <div class="col-sm-12">
    <div class="row row-bottom-1">
      <div class="col-bottom-1 col-sm-2">
        <p class="hour1">
          ${formatAMPM(response.data.hourly[1].dt)}
        </p>
      </div>
      <div class="col-bottom-2 col-sm-2">
        <p class="hour2">
          ${formatAMPM(response.data.hourly[2].dt)}
        </p>
      </div>
      <div class="col-bottom-3 col-sm-2">
        <p class="hour3">
          ${formatAMPM(response.data.hourly[3].dt)}
        </p>
      </div>
      <div class="col-bottom-4 col-sm-2">
        <p class="hour3">
          ${formatAMPM(response.data.hourly[4].dt)}
        </p>
      </div>
      <div class="col-bottom-5 col-sm-2">
        <p class="hour4">
          ${formatAMPM(response.data.hourly[5].dt)}
        </p>
      </div>
      <div class="col-bottom-6 col-sm-2">
        <p class="hour5">
          ${formatAMPM(response.data.hourly[6].dt)}
        </p>
      </div>
    </div>
    <div class="row row-bottom-2">
      <div class="col-bottom-2 col-sm-2">
        <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[1].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-2 col-sm-2">
        <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[2].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-3 col-sm-2">
         <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[3].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-4 col-sm-2">
         <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[4].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-5 col-sm-2">
         <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[5].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-6 col-sm-2">
        <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[6].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
    </div>
    <div class="row row-bottom-3">
      <div class="col-bottom-3 col-sm-2">
        <p class="first-hour-temperature">
          ${Math.round(response.data.hourly[1].temp)}º
        </p>
      </div>
      <div class="col-bottom-2 col-sm-2">
        <p class="temper2">
           ${Math.round(response.data.hourly[2].temp)}º
        </p>
      </div>
      <div class="col-bottom-3 col-sm-2">
        <p class="temper3">
           ${Math.round(response.data.hourly[3].temp)}º
        </p>
      </div>
      <div class="col-bottom-4 col-sm-2">
        <p class="temper4">
           ${Math.round(response.data.hourly[4].temp)}º
        </p>
      </div>
      <div class="col-bottom-5 col-sm-2">
        <p class="temper5">
           ${Math.round(response.data.hourly[5].temp)}º
        </p>
      </div>
      <div class="col-bottom-6 col-sm-2">
        <p class="temper6">
           ${Math.round(response.data.hourly[6].temp)}º
        </p>
      </div>
    </div>
    <div class="row row-bottom-4">
      <div class="col-bottom-4 col-sm-2">
        <p class="feels1">
          Feels ${Math.round(response.data.hourly[1].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-2 col-sm-2">
        <p class="feels2">
          Feels ${Math.round(response.data.hourly[2].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-3 col-sm-2">
        <p class="feels2">
          Feels ${Math.round(response.data.hourly[3].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-4 col-sm-2">
        <p class="feels3">
          Feels ${Math.round(response.data.hourly[4].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-5 col-sm-2">
        <p class="feels4">
          Feels ${Math.round(response.data.hourly[5].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-6 col-sm-2">
        <p class="feels5">
          Feels ${Math.round(response.data.hourly[6].feels_like)}º
        </p>
      </div>
    </div>
    <div class="row row-bottom-5">
      <div class="col-bottom-5 col-sm-2">
        <p class="prep1">
          ${response.data.hourly[1].humidity}%
        </p>
      </div>
      <div class="col-bottom-2 col-sm-2">
        <p class="prep2">
          ${response.data.hourly[2].humidity}%
        </p>
      </div>
      <div class="col-bottom-3 col-sm-2">
        <p class="prep2">
          ${response.data.hourly[3].humidity}%
        </p>
      </div>
      <div class="col-bottom-4 col-sm-2">
        <p class="prep3">
          ${response.data.hourly[4].humidity}%
        </p>
      </div>
      <div class="col-bottom-5 col-sm-2">
        <p class="prep4">
          ${response.data.hourly[5].humidity}%
        </p>
      </div>
      <div class="col-bottom-6 col-sm-2">
        <p class="prep5">
          ${response.data.hourly[6].humidity}%
        </p>
      </div>
    </div>
  </div>
</div>
</div>
`;
    hourlyElement.innerHTML = hourlyHTML;
  }

  // fuction to get your location
  function getForecast(coordinates) {
    let apiKey = "0581a5c52e36d81c89d13f976ae61d0c"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
  }


  function displayWeatherCondition(response) {
    document.querySelector("#search-engine").innerHTML = response.data.name;
    document.querySelector(".now-temperature").innerHTML =
      " " + Math.round(celsiusTemperature) + "º";
    document.querySelector(".feels").innerHTML =
      Math.round(response.data.main.feels_like) + "º";
    document.querySelector("#humidity").innerHTML =
      response.data.main.humidity + "%";
    document.querySelector("#wind").innerHTML =
      Math.round(response.data.wind.speed) + "m/s";
    document.querySelector(".visibility").innerHTML = response.data.visibility;
    document.querySelector(".description").innerHTML = " " +
      response.data.weather[0].main;
    document.querySelector("#search-engine").value = response.data.name;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)

    celsiusTemperature = response.data.main.temp;

    getForecast(response.data.coord);

  }

  // function to search cidty by city name
  function searchCity(city) {
    let apiKey = "0581a5c52e36d81c89d13f976ae61d0c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
    lod_data()
  }

  function handleSubmit(event) {
    event.preventDefault();
    debugger
    let city = document.querySelector("#search-engine").value;
    searchCity(city);
  }

  function searchLocation(position) {
    let apiKey = "0581a5c52e36d81c89d13f976ae61d0c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }


  // fuction to display all the avilabe dates present in here
  async function lod_data() {
    let response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=0581a5c52e36d81c89d13f976ae61d0c&units=metric");
    let data = await response.text();
    let obj = JSON.parse(data);
    if (obj.cod === '400') {
      return
    } else {
      var data_fix = document.querySelector("#Schedule_data_main_1").innerHTML
      var data_checkbox_upload_1 = ""

      let data_checkbox_upload = "";
      for (let i = 0; i < obj.list.length; i++) {
        if (i % 500 === 0) { }
        else {
          let value1 = obj.list[i].dt_txt;
          let data_checkbox_upload_new = '<div class="form-check form-check-inline col-8  col-sm-8	col-md-4	col-lg-4"><input name="check_box_time" class="form-check-input" type="checkbox" id="' + value1 + '" value="' + value1 + '"><label class="form-check-label" for="inlineCheckbox1">' + value1 + '</label></div>';
          data_checkbox_upload_1 = data_checkbox_upload_1.concat(data_checkbox_upload_new);
        }
      }
      document.querySelector("#Schedule_data_main").innerHTML = data_checkbox_upload_1 + "<br>";

    }
  }


  // fuction to listen the tab/click the button check my Schedule 
  // then get all data meeting type indoor offline online
  // the get data from all dates
  // send results
  async function checkMySchedule() {
    let type_of_meeting = ""

    var ele = document.getElementsByName('inlineRadioOptions');
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked)
        type_of_meeting = ele[i].value;
    }

    var check_box_vaalues = []
    var checkboxes = document.getElementsByName('check_box_time');
    for (var checkbox of checkboxes) {
      if (checkbox.checked) {
        check_box_vaalues.push(checkbox.value);
      }
    }

    var response1 = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=0581a5c52e36d81c89d13f976ae61d0c&units=metric");
    var data1 = await response1.text();
    var obj1 = JSON.parse(data1);
    if (obj1.cod === 400) {
    } else {
      let chars = [];

      for (let x in check_box_vaalues) {

        for (let i = 0; i < obj1.list.length; i++) {
          let value1 = obj1.list[i].dt_txt;

          if (check_box_vaalues[x] === value1) {
            chars.push(obj1.list[i].weather[0].description);
          }
        }
      }
      let uniqueChars = [...new Set(chars)];
      var data_to_print_alert = ""
      if (type_of_meeting === "Online" || type_of_meeting === "indoor_Meeting") {

        for (let xa = 0; xa < chars.length; xa++) {
          let check_value = chars[xa]
          if (check_value === "clear sky" || check_value === "few clouds" || check_value === "scattered clouds" || check_value === "broken clouds") {
            data_to_print_alert += "\n" + check_box_vaalues[xa] + "--> " + "Weather is Great"
          } else if (check_value === "shower rain" || check_value === "mist") {
            data_to_print_alert += "\n" + check_box_vaalues[xa] + "--> " + "Weather will be great just according to your meeting a little rain and mist"
          } else if (check_value === "snow") {
            if (check_value === "thunderstorm") {
            } else {
              data_to_print_alert += "\n" + check_box_vaalues[xa] + "--> " + "Weather will be great just according to your event it might snow there"
            }
          } else {
            data_to_print_alert += "\n" + check_box_vaalues[xa] + "--> " + "There is a thunderstom comming be alert for powercuts"
          }
        }
        data_to_print_alert += "\nHave a great Event"
        alert(data_to_print_alert)
      } else {

        for (let xa = 0; xa < chars.length; xa++) {
          let check_value = chars[xa]

          if (check_value === "clear sky" || check_value === "few clouds" || check_value === "scattered clouds") {
            data_to_print_alert += "\n" + check_box_vaalues[xa] + "--> " + "Weather is Great"
          } else if (check_value === "mist" || check_value === "broken clouds") {
            data_to_print_alert += "\n" + check_box_vaalues[xa] + "--> " + "Weather should be great just according to your Event but be alert and if possible change timings"
          } else if (check_value === "shower rain") {
            if (check_value === "thunderstorm") {
            } else {
              data_to_print_alert += "\n" + check_box_vaalues[xa] + "--> " + "Change meeting plans there is a might be shower rain"
            }
          } else if (check_value === "snow") {
            data_to_print_alert += "\n" + check_box_vaalues[xa] + "--> " + "Change meeting plans there is a might be snow fall"
          } else {
            data_to_print_alert += "\n" + check_box_vaalues[xa] + "--> " + "There is a thunderstom / heavy rainfall comming change plans immediately"
          }
        }
        data_to_print_alert += "\nHave a great Event"
        alert(data_to_print_alert)
      }
    }
  }

  useEffect(() => {
    hourNow();
    // defult city name to display
    searchCity("jaipur");
  }, [])

  return (
    <div className="schedule">
      <div className="container-body">
        {/*  form 1 input for city name and location button */}
        <form id="search-form" onSubmit={handleSubmit}>
          <h1 className="city">
            <input type="text" id="search-engine" className="search-engine" placeholder="Search for city" autoComplete="off" autoFocus="on" defaultValue={city} onChange={e => setCity(e.target.value)} />
          
          </h1>
        </form>
        {/*  end form 1 */}

       
        
        <br />
        <div className="weather-forecast-hourly" id="hourly">
        </div>
        {/*  information 2 end (6 hour forcast)  */}

        <br />

        {/*  form 2 check my schedule */}

        <div id="Schedule_data_main_1">

          <div style={{ width: "max-content", textAlign: "center", margin: "auto" }}>
            <h4 style={{ color: "#6c757d" }}>Check My Schedule</h4>

            <div className="form-check form-check-inline" style={{ padding: "auto" }}>
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Online" />
              <label className="form-check-label" htmlFor="inlineRadio1">Online</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Offline" />
              <label className="form-check-label" htmlFor="inlineRadio2">Offline</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"
                value="indoor_Meeting" />
              <label className="form-check-label" htmlFor="inlineRadio2">Indoor Meeting</label>
            </div>
          </div>

          {/*  form 2 end check my schedule */}


          <br />
          {/*  form 3 auto genrate check my schedule */}
          <div id="Schedule_data_main"> </div>
          {/*  form 3 end auto genrate check my schedule */}



          {/*  button for run Check My Schedule */}

          <div style={{ width: "max-content", textAlign: "center", margin: "auto" }}>
            <button id="check_btn" type="button" className="btn btn-outline-info btn-lg btn-block"
              onClick={checkMySchedule}>Check My Schedule</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Schedule;
