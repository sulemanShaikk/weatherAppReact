// import React from 'react';
// import './WeatherApp.css';
// import searchIcon from '../Assets/search.png';
// import cloudIcon from '../Assets/cloud.png';
// import windIcon from '../Assets/wind.png';
// import humidityIcon from '../Assets/humidity.png';

// const WeatherApp = () => {
//   let api_key = "74d20615bf191df539048326b57cdb48";

//   const search = async () => {
//     const element = document.getElementsByClassName("cityInput");
//     if (element[0].value === "") {
//       return 0;
//     }
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&lat=44.34&lon=10.99&units=metric&appid=${api_key}`;
//     try {
//       let response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('City not found');
//       }
//       let data = await response.json();
//       const humidity = document.getElementsByClassName("humidity-percent");
//       const wind = document.getElementsByClassName("wind-rate");
//       const temperature = document.getElementsByClassName('weather-temp');
//       const location = document.getElementsByClassName("weather-location");

//       humidity[0].innerHTML = data.main.humidity;
//       wind[0].innerHTML = data.wind.speed;
//       temperature[0].innerHTML = data.main.temp;
//       location[0].innerHTML = data.name;
//     } catch (error) {
//       console.error('Error fetching weather data:', error.message);
//       // Handle error, e.g., display an error message to the user
//     }
//   };

//   return (
//     <div className='container'>
//       <div className='top-bar'>
//         <input type='text' className='cityInput' placeholder='Search' />
//         <div className="searchIcon" onClick={search}>
//           <img src={searchIcon} alt='' />
//         </div>
//       </div>

//       <div className="weather-image">
//         <img src={cloudIcon} alt='' />
//       </div>
//       <div className="weather-temp">24° C</div>
//       <div className="weather-location">London</div>
//       <div className="data-container">
//         <div className="element">
//           <img src={humidityIcon} alt='' className='icon' />
//           <div className="data">
//             <div className="humidity-percent">64%</div>
//             <div className="text">Humidity</div>
//           </div>
//         </div>
//         <div className="element">
//           <img src={windIcon} alt='' className='icon' />
//           <div className="data">
//             <div className="wind-rate">18 KM/hr</div>
//             <div className="text">Wind speed</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WeatherApp;

import React, { useState } from 'react';
import './WeatherApp.css';
import searchIcon from '../Assets/search.png';
import cloudIcon from '../Assets/cloud.png';
import windIcon from '../Assets/wind.png';
import humidityIcon from '../Assets/humidity.png';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    wind: '',
    temperature: '',
    location: '',
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const api_key = "74d20615bf191df539048326b57cdb48";

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&lat=44.34&lon=10.99&units=metric&appid=${api_key}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    
    <div className={`container ${isDarkMode ? 'dark-mode' : 'day-mode'}`}>
      
      <div className='top-bar'>
        
        <input type='text' className='cityInput' placeholder='Search' />
        <div className="searchIcon" onClick={search}>
          <img src={searchIcon} alt='Search' />
        </div>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? 'Day mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="weather-image">
        <img src={cloudIcon} alt='Cloud' />
      </div>
      <div className="weather-temp">{weatherData.temperature}° C</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt='Humidity' className='icon' />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt='Wind' className='icon' />
          <div className="data">
            <div className="wind-rate">{weatherData.wind} KM/hr</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
