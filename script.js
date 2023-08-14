// initializing variables
let container = document.getElementById("weather")
let diff = Intl.DateTimeFormat().resolvedOptions().timeZone;
let api = fetch(`https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&hourly=temperature_2m,is_day&current_weather=true&timezone=${diff}`)
let DayLogo = document.getElementById("DayOrNightImg")
let TimeElement = document.getElementById("time")
let TempElement = document.getElementById("Temperature")
let WindElement = document.getElementById("Wind")
let date = new Date()

// Data request
api.then((response) => {
    return response.json()
}).then((response) => {
    console.log(response)
    // Checking Day
    let Day
    let Time_image 
    if (response.current_weather.is_day == 1){
        Day = "day"
        DayLogo.src = "/day.jpg"
        DayLogo.parentElement.insertAdjacentText("beforeend", Day)
    } else{
        Day = "night" 
        DayLogo.src = "/night.png"
        DayLogo.parentElement.insertAdjacentText("beforeend", Day)
    }
    //Setting Time
    let Time = `${date.getHours()}:${date.getMinutes()} (${response.timezone_abbreviation})`
    TimeElement.insertAdjacentText("beforeend", Time)
    //Setting Temperature
    let Temp = response.current_weather.temperature
    TempElement.insertAdjacentText("beforeend", Temp)
    //Setting Wind Speed
    let Wind = response.current_weather.windspeed
    WindElement.insertAdjacentText("beforeend", Wind)
})