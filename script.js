const weatherIcons = {
    "01d": "01_sunny_color.png",                
    "01n": "34_full_moon_color.png",            
    "02d": "02_moon_stars_color.png",           
    "35d": "35_partly_cloudy_daytime_color@2x.png", 
    "02n": "36_partly_cloudy_night_color.png",
    "03d": "03_cloud_color.png",               
    "03n": "03_cloud_color.png",               
    "04d": "04_sun_cloudy_color.png",          
    "04n": "05_moon_cloudy_color.png",         
    "09d": "11_heavy_rain_color.png",          
    "10d": "Image (2).png",                    
    "10n": "Image (2).png",                    
    "11d": "07_lightning_color.png",           
    "13d": "22_snow_color.png",                
    "50d": "15_fog_color.png",                 
    "40d": "40_rainbow_color.png",            
    "30d": "30_sunset_color.png",              
    "38d": "38_blowing_sand_color.png",        
    "16d": "16_hail_color.png",                
    "18d": "18_moderate_snow_color.png",       
    "24d": "24_blizzard_color.png",            
    "32d": "32_high_temperature_color.png",    
    "37d": "37_dry_color.png",                 
    "27d": "27_typhoon_color.png",             
    "11n": "14_thunderstorm_color.png",        
    "38n": "39_sandstorm_color.png",        
};

document.querySelectorAll(".dropdown-content a").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const city = e.target.getAttribute("data-city");
        fetchWeather(city);
    });
});
function fetchWeather(city) {
    const apiKey = "3045dd712ffe6e702e3245525ac7fa38";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            const iconCode = data.weather[0].icon; 
            let icon = weatherIcons[iconCode] || "";
            document.getElementById("weatherIcon").src = icon;

            const roundedTemp = Math.round(data.main.temp);
            document.getElementById("temperature").textContent = `${roundedTemp}°`;
            const currentDate = new Date();
            const options = { day: "numeric", month: "long", calendar: "persian" };
            const formattedDate = currentDate.toLocaleDateString("fa-IR", options);
            document.getElementById("cityDate").textContent = `${city} ${formattedDate}`;
            document.getElementById("humidity").textContent = data.main.humidity;
            document.getElementById("windSpeed").textContent = data.wind.speed;
            document.getElementById("weatherInfo").style.display = "block";
        });

fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
        const forecastCards = document.getElementById("forecastCards");
        forecastCards.innerHTML = "";

        document.querySelector("#forecast h2").textContent = `پیش‌بینی روزهای آینده‌ی ${city}`;
       const days = [];
       data.list.slice(5).forEach((item) => { 
           const forecastDate = new Date(item.dt * 1000);
           const options = { weekday: "long" }; 
           const dayName = forecastDate.toLocaleDateString("fa-IR", options);
           if (!days.some(day => day.name === dayName)) {
               const dayData = {
                   name: dayName,
                   icon: item.weather[0].icon,
                   temp: item.main.temp,
               };
               days.push(dayData);
           }
       });
       days.forEach((day) => {
        const forecastCard = document.createElement("div");
        forecastCard.className = "forecast-card";
        forecastCard.style.border = "2px solid rgba(239, 239, 239, 1)";
        forecastCard.style.borderRadius = "12px";
        forecastCard.style.width="100px"
        forecastCard.style.padding="10px"


    
        const icon = weatherIcons[day.icon] || "default.png";
        forecastCard.innerHTML = `
            <img src="${icon}" alt="${day.name}" width="50" height="50">
            <h1>${Math.round(day.temp)}°</h1> 
            <p>${day.name}</p> 
        `;
    
        forecastCards.appendChild(forecastCard);
    });
    
   });
}