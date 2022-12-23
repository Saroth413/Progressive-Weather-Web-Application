import React, { useState, useEffect, useRef } from 'react';

const Today = ({ city, setCity, setTimezone, setHourlyData, setDailyData }) => {
  const searchCity = useRef();
  const [temperature, setTemperature] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [desc, setDesc] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [visibility, setVisibility] = useState("");

  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    searchCity.current.value = city;
    getLatLong(city);
  }, []);
  async function getLatLong(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    const { coord: { lat, lon }, dt, timezone } = data;
    getWeather(lat, lon);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "August", "October", "November", "December"];
    const date = new Date(dt * 1000);
    const offset = (date.getTimezoneOffset() * 60 + (timezone)) * 1000;
    date.setTime(date.getTime() + offset);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    setDay(days[date.getDay()]);
    setDate(date.getDate());
    setMonth(months[date.getMonth()]);
    setTime(`${hours}:${minutes} ${ampm.toUpperCase()}`)
  }

  async function getWeather(lat, long) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    const { temp, feels_like, humidity, pressure, wind_speed, visibility, weather } = data.current;
    setTemperature(temp);
    setFeelsLike(feels_like);
    setDesc(weather[0]["main"]);
    setHumidity(humidity);
    setPressure(pressure);
    setWindSpeed((wind_speed * 3.6).toFixed(2));
    setVisibility((visibility / 1000).toFixed(2));
    setTimezone(data.timezone_offset);
    setHourlyData(data.hourly.slice(0, 6));
    setDailyData(data.daily.slice(0, 6));
  }

  return <div>
    <section className="today" id="today">
      <div className='search-input'>
        <input ref={searchCity} type="text" placeholder='Seach City' />
        <i className="fa fa-magnifying-glass" onClick={() => {
          const currentCity = searchCity.current.value;
          getLatLong(currentCity);
          setCity(currentCity);
        }} ></i>
      </div>
      <div className='time'>
        <h1>{time}</h1>
        <h3>{day}, {date} {month}</h3>

        <img src="../images/logo2.png" alt='Weather Fun Logo' />

        <h1><span>{temperature}<sup>o</sup>C</span>&nbsp;
          {desc} | FEELS LIKE {feelsLike}<sup>o</sup>C</h1>
        <div className='box2'>
          <div className="text">

            <h3>WIND:    <span>{windSpeed} km/h</span></h3>
            <h3>HUMIDITY:    <span>{humidity} %</span></h3>
            <h3>VISIBILITY: <span>{visibility} km</span></h3>
            <h3>PRESURE:  <span> {pressure} mb</span></h3>
            {/* <h3>Name<span> Aathil</span>  </h3>
          <h3>Age<span>20</span>  </h3>
          <h3>Medium<span>Tamil</span> </h3>
          <h3>School<span>Zahira Collage</span></h3> */}
          </div>
        </div>
      </div>






    </section>
  </div>;
};

export default Today;
