import React from 'react';

const Daily = ({ dailyData }) => {

  return <div>
    <section className="today" id="today">
      <div>
        <h1>Daily Forecast</h1>
      </div>
      <div className="boxes">
        {
          dailyData.map((data, ind) => {
            const { temp, feels_like, humidity, dt } = data;
            const date = new Date(dt * 1000);
            const hours = date.getHours();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let dayTime = ""
            if ((20 <= hours <= 23) || (0 <= hours <= 4)) {
              dayTime = "night";
            } else if (5 <= hours <= 11) {
                dayTime = "morn";
            } else if (12 <= hours <= 16) {
              dayTime = "day";
            } else {
              dayTime = "eve";
            }
            return (
              <div key={ind} className="box">
                <h2>{days[date.getDay()]}</h2>
                <img src="./images/logo2.png" alt='Weather Fun Logo' />
                <h3 style={{ fontWeight: "bolder" }}>{temp[dayTime]}<sup>o</sup></h3>
                <div className='weather-info'>
                  <h3>Feels Like {feels_like[dayTime]}<sup>0</sup></h3>
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

export default Daily;
