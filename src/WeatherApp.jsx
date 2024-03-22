import SearchBox from "./SearchBox"
import ShowInfo from "./ShowInfo"
import { useState } from "react"

export default function WeatherApp (){
   let [weatherInfo, setWeatherInfo] = useState({
    city:"Delhi",
    temp: 23.68,
    feelsLike: 25.17,
    maxTemp: 27.04,
    minTemp: 17.08,
    humidity: 36,
    windSpeed: 4,
    rain: 5,
    wtype: "clear sky",
    visibility: 2000,
   })

   let updateInfo = (newInfo) =>{
    setWeatherInfo(newInfo);
   }

    return (
        <>
        <SearchBox updateInfo={updateInfo} />
        <ShowInfo info={weatherInfo}/>


        </>
    )
}