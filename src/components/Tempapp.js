import React from "react";
import './css/style.css';
import { useState, useEffect } from "react";

const Tempapp = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Jaipur");
    const [weather, setWeather] = useState(null);
    const [coord, setcoord] = useState(null);

    useEffect(() => {
        const fetchApi = async () =>{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8c060aec3ac02769d3fe884de4aeb79c&units=metric`
            const response = await fetch(url);
            // console.log(response);
            const resJson = await response.json();
            console.log(resJson);
            setCity(resJson.main);
            setWeather(resJson.weather[0]);
            setcoord(resJson.coord);
        }
        fetchApi();
    }, [search]);


    return(
        <div className="box">
        <div className="d-flex">
            <input className="form-control me-2" type="search" value={search} placeholder="Search" aria-label="Search" onChange={(event)=>{
                setSearch(event.target.value);
            }}/>
        </div>
        {city ? ( <div className="container justify-content-center text-center mt-3">
        <h2>{search}</h2>
        {weather ? (<p className="mt-3"><img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="weather" /></p>) : null}
        <h3>{weather.main}</h3>
        
        <h4 className="mt-4">{city.temp}°Cel</h4>
        <p>Lat: {coord.lat} | lon: {coord.lon}</p>
        <p className="mt-1">Max: {city.temp_max}°Cel | Min: {city.temp_min}°Cel</p>
        </div>
    ) : 
        (
        <p className="text-center">No data found</p>
        )}
        </div>
    )
}

export default Tempapp;