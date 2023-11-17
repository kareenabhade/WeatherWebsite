import React,{useState,useEffect} from 'react'
import './weather.css'
import search_icon from '../images/find.png'
import sunny from '../images/sunny.png'
import rainy from '../images/rainy.png'
import windy from '../images/windy.png'
import humidity from '../images/humidity.png'
import wind from '../images/wind.png'
import scatteredClouds from '../images/scatteredClouds.png'
import fewClouds from '../images/few clouds.png'
import showerRain from '../images/showerRain.png'
import thunderstrom from '../images/thunderstorm.png'

function Weather() {
  const [clicked, setClick] = useState(false);
  const [cityName , setCityName] = useState("");
  const [descp, setDescp] = useState("");
  const [temp, setTemp] = useState("24°C")
  const [humid, setHumidity] = useState("64%")
  const [windSpeed, setWindSpeed] = useState("4 km/h")
  let api_key = '2bbf764d603136126f40ad731c7d6a83';


  useEffect(() => {
    if(clicked){
    const fetchData = async () => {
      if(!cityName) {
        alert("enter valid city name");
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`
      
      try {
        const response = await fetch(url);
      const newData = await response.json();
      setTemp(newData.main.temp + "°C");
      setHumidity(newData.main.humidity + "%");
      setWindSpeed(newData.wind.speed + "km/h");
      setDescp("[ " + newData.weather[0].description + " ]");
      document.getElementsByClassName('city')[0].innerText=newData.name;
      
      let weatherImg = document.getElementsByClassName('weather-img')[0];
      let imgSrc = newData.weather[0].icon;
    
      if(imgSrc=="01d" || imgSrc=='01n'){
            weatherImg.src=sunny;
      } 
      else if(imgSrc=="02d" || imgSrc=="02n"){
        weatherImg.src=fewClouds;
      }
      else if(imgSrc=="03d" || imgSrc=="03n" || imgSrc=="04d" || imgSrc=="04n"){
        weatherImg.src=scatteredClouds;
      }
      else if(imgSrc=="09d" || imgSrc=="09n"){
        weatherImg.src=showerRain;
      }
      else if(imgSrc=="10d" || imgSrc=="10n"){
        weatherImg.src=rainy;
      }
      else if(imgSrc=="11d" || imgSrc=="11n"){
        weatherImg.src=thunderstrom;
      }
      else if(imgSrc=="13d" || imgSrc=="13n"){
        weatherImg.src=snow;
      }
      else if(imgSrc=="50d" || imgSrc=="50n"){
        weatherImg.src=windy;
      }
        
      } catch (error) {
        console.error("city name is not valid");
        alert("city name is not valid");
      }
      
      
    };
  
    fetchData();
    setClick(false);
  }
  }, [cityName,clicked,api_key]);

  



  return (
    <>
    <div className='main-container'>
      <div className='search-bar'>
        <input className='search-input' type='text' placeholder='Search by city name' value={cityName} onChange={(e)=>{setCityName(e.target.value)}}/>
        <img src={search_icon} className='search-icon' onClick={()=>setClick(true)}></img>
      </div>
      <img className='weather-img' src={sunny}></img>
      <p className='temp'>{temp}</p>
      <p className='city'>London</p>
      <p className='descp'>{descp}</p>

      <div className='bottom-container'>
        <div className='humidity'>
            <img src={humidity} className='humid-img'/>
            <p className='humid-percentage'>{humid}</p>
            <p className='h-name'>Humidity</p>
        </div>
        <div className='wind-speed'>
            <img src={wind} className='wind-img'/>
            <p className='wind-percentage'>{windSpeed}</p>
            <p className='w-name'>Wind Speed</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Weather