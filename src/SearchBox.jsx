import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';

const WeatherContainer = styled('div')({
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
});


export default function SearchBox( {updateInfo}) {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [displayStyle, setDisplayStyle] = useState({ display: "none" });
    const [error, setError] = useState(false);
    const API_URL = "http://api.openweathermap.org/geo/1.0/direct";
    const API_ID = "0b92fa471fb989ed9569259f3f66904f";
    const W_URL = "https://api.openweathermap.org/data/2.5/weather";

    const getInfo = async () => {
        let result;
        try {
            const response = await fetch(`${API_URL}?q=${city}&limit=1&appid=${API_ID}`);
            const jsonData = await response.json();
            const wReport = await fetch(`${W_URL}?lat=${jsonData[0].lat}&lon=${jsonData[0].lon}&appid=${API_ID}`);
            const weatherJson = await wReport.json();

            result = {
                city: city,
                temp: (weatherJson.main.temp - 273.15).toFixed(2),
                feelsLike: (weatherJson.main.feels_like - 273.15).toFixed(2),
                maxTemp: (weatherJson.main.temp_max - 273.15).toFixed(2),
                minTemp: (weatherJson.main.temp_min - 273.15).toFixed(2),
                humidity: weatherJson.main.humidity,
                windSpeed: Math.round(weatherJson.wind.speed),
                rain: weatherJson.clouds.all,
                wtype: weatherJson.weather[0].description,
                visibility: weatherJson.visibility,
            };

            setWeatherData(result);
            setDisplayStyle({ display: "block" });
            setError(false);
        } catch (error) {
            throw error;
        }
        return result;
    };

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
        let newInfo = await getInfo();
        updateInfo (newInfo);
        setCity("");
        }catch(err){
            setError(true);
        }
    };

    console.log(weatherData);

    return (
        <>
            <h2>Search For the Weather</h2>
            <form onSubmit={handleSubmit} style={{marginBottom : '30px'}}>
                <TextField id="outlined-basic" label="City Name" variant="outlined" required onChange={handleChange} value={city} />
                <br />
                <br />
                <Button size="medium" type='submit' variant='contained'>Search</Button>
                {error && <p style= {{ color : "red"}} > No such place found in our Database !</p>}
            </form>

            <CssBaseline />
        </>
    );
}