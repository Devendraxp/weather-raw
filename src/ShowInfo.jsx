import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import HazeW from './WeatherImg/hazeW.jpg';
import OvercastCloud from './WeatherImg/overcastCloud.webp';
import ClearSkyW from './WeatherImg/clearSkyW.jpg';
import RainyW1 from './WeatherImg/rainyW1.jpg';
import ColdW from './WeatherImg/ColdW.jpg';
import DefaultW from './WeatherImg/defaultW.jpg';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterIcon from '@mui/icons-material/Water';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import FloodIcon from '@mui/icons-material/Flood';

const weatherIcons = {
  'haze': WaterIcon,
  'clear sky': WbSunnyIcon,
  'overcast clouds': ThermostatIcon,
  'rainy': FloodIcon,
  'cold': SevereColdIcon,
  'default': WbSunnyIcon
};

const weatherImages = {
  'haze': HazeW,
  'clear sky': ClearSkyW,
  'overcast clouds': OvercastCloud,
  'rainy': RainyW1,
  'cold': ColdW,
  'default': DefaultW
};

const ActionAreaCard = ({ info }) => {
  const { city, wtype, temp, feelsLike, maxTemp, minTemp, humidity, windSpeed, visibility, rain } = info;

  const WeatherIcon = weatherIcons[wtype] || weatherIcons['default'];
  const WeatherImage = weatherImages[wtype] || weatherImages['default'];

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Card style={{ height: "860px", maxWidth: '600px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={WeatherImage}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <h2><b>{city} &nbsp; &nbsp; <WeatherIcon /></b></h2>
            <h3>Weather: {wtype}</h3>
            <h3>Temperature: {temp} °C</h3>
            <h3>Feels like: {feelsLike} °C</h3>
            <h3>Max Temp: {maxTemp} °C</h3>
            <h3>Min Temp: {minTemp} °C</h3>
            <h3>Humidity: {humidity}%</h3>
            <h3>Wind Speed: {windSpeed} Km/h</h3>
            <h3>Visibility: {visibility / 1000} Km</h3>
            <h3>Rain Amount: {rain}%</h3>
            <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
            <br /><br /><br />
            <hr />
            Weather API provided by OpenWeatherMap - may be incorrect sometimes!
            <br /><br />
            <hr />
            <p>&#169; 02.2024 &nbsp; &nbsp; &nbsp; &nbsp; Made with &#9829; by Devendra
              <br />
              <br />
              <b>In developing phase</b>
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;