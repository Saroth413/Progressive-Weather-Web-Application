import React from 'react';

const Hourly = ({ timezone, hourlyData }) => {

  return <div>
    <section className="today" id="today">
      <div>
        <h1>Hourly Forecast</h1>
      </div>
      <div className="boxes">
        {
          hourlyData.map((data, ind) => {
            const { temp, feels_like, humidity, dt } = data;
            const date = new Date(dt * 1000);
            const offset = (date.getTimezoneOffset() * 60 + (timezone)) * 1000;
            date.setTime(date.getTime() + offset);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? "pm" : "am";
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? "0" + minutes : minutes;

            return (
              <div key={ind} className="box">
                <h2>{hours}:{minutes} {ampm.toUpperCase()}</h2>
                <img src="./images/logo2.png" alt='Weather Fun Logo' />
                <h3 style={{ fontWeight: "bolder" }}>{temp}<sup>o</sup></h3>
                <div className='weather-info'>
                  <h3>Feels Like {feels_like}<sup>0</sup></h3>
                  <h3>{humidity}%</h3>
                </div>
              </div>
            )
          })
        }
      </div>

    </section>
  </div>;
};

export default Hourly;
