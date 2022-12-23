
import './App.css';
import { useState, useEffect } from 'react';
import Today from './components/Today';
import Hourly from './components/Hourly';
import Daily from './components/Daily';
import Schedule from './components/Schedule';
import { Link, Route, Routes } from 'react-router-dom';
function App() {
  const [city, setCity] = useState("Ampara");
  const [timezone, setTimezone] = useState("");
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    let menu = document.querySelector('#menu-btn');
    let header = document.querySelector('.header');
    menu.onclick = () => {
      menu.classList.toggle('fa-times');
      header.classList.toggle('active');
    }
  }, [])

  return (
    <div className="App">

      {/* <Sidebar /> */}
      <header className="header">

        <div className="user">
          <img src="images/logo.png" alt="Weather Fun Logo" />
          <h2>Weather Fun</h2>
          <p>Best way to know your city weather</p>
        </div>

        <nav>
          {/* <a href="#"> Today</a> */}
          {/* <a href="#">Hourly Forecast</a> */}
          {/* <a href="#">Daily Forecast</a> */}
          {/* <a href="#">User's Schedule  </a> */}
          <Link to="/">Today</Link>
          <Link to="/hourly">Hourly</Link>
          <Link to="/daily">Daily</Link>
          <Link to="/schedule">User's Schedule</Link>
        </nav>
        <div>



        </div>

      </header>

      <Routes>
        <Route path="/" element={<Today city={city} setCity={setCity} setTimezone={setTimezone} setHourlyData={setHourlyData} setDailyData={setDailyData} />} />
        <Route path="/hourly" element={<Hourly timezone={timezone} hourlyData={hourlyData} />} />
        <Route path="/daily" element={<Daily dailyData={dailyData} />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>



      <div id="menu-btn" className="fas fa-bars" ></div>



      {/* <div id="theme-toggler" className="fas fa-moon"></div> */}


      {/* 
      <section className="today" id="today">  

      </section> */}

    </div>
  );
}

export default App;
