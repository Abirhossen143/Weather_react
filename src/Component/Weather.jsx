import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
const Weather = () => {
  const inputRef = useRef();
  const [WeatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error By the Fatching data");
    }
  };
  useEffect(() => {
    search("Dhaka");
  }, []);
  return (
    <div className="place-self-center p-10 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col items-center">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="h-12  outline-none border-none rounded-3xl pl-6 text-[#626262] bg-[#ebfffc] text-lg"
        />
        <img
          onClick={() => search(inputRef.current.value)}
          src={search_icon}
          alt=""
          className="w-[48px] p-[14px] rounded-[50%] bg-[#ebfffc] cursor-pointer"
        />
      </div>
      {WeatherData ? (
        <>
          <img
            src={clear_icon}
            alt=""
            className="w-[150px] my-[30px] mx-[0px]"
          />
          <p className="text-[#fff] text-[80px] leading-none ">
            {WeatherData.temperature}°C
          </p>
          <p className="text-white text-[40px] ">{WeatherData.location}</p>
          <div className="w-[100%] mt-[40px] text-white flex justify-between">
            <div className="flex items-start gap-[12px] text-[22px]">
              <img
                className="w-[26px] mt-[10px]  "
                src={humidity_icon}
                alt=""
              />
              <div>
                <p>{WeatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="flex items-start gap-[12px] text-[22px]">
              <img className="w-[26px] mt-[10px]  " src={wind_icon} alt="" />
              <div>
                <p>{WeatherData.windSpeed}</p>
                <span className="block text-[16px]">Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
