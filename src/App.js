import React, { useState } from 'react';
import wind from './assets/wind.png';
import humidity from './assets/humidity.png';

const api = {
  key: "318bca6248ab75e4973d67e64237e2f6",
  base: "https://api.openweathermap.org/data/2.5/" 
}

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

	const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}, ${month}, ${year}`
  }
  return (

    <div className={
		(typeof weather.main != "undefined") 
		? ((weather.main.temp > 16) 
			? 'App warm' 
			: 'App') 
		: 'App'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
			<div className="temperature-rage">{Math.round(weather.main.temp_max)}°c/{Math.round(weather.main.temp_min)}°c</div>
			<div className="description">
				<div className="wind">
					<img src={wind} alt="Wind: "/>
					<p>{weather.wind.speed} km/h</p>
				</div>
				<div className="humidity">
					<img src={humidity} alt="Wind: "/>
					<p>{weather.main.humidity}%</p>
				</div>
				<div className="main">
					<img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Wind: "/>
					<p>{weather.weather[0].description}</p>
				</div>
			</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
