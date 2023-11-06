// getting element elements
const TempElement = document.getElementById("Temperature");
const WindElement = document.getElementById("wind");
const WeatherElement = document.getElementById("Weather-Condition");
const WeatherImageElement = document.getElementById("Weather-image");
const locationElement = document.getElementById("location");
const humidityElement = document.getElementById("Humidity");
const precipitationElement = document.getElementById("precipitation");
const box = document.getElementById("location-box")
const date = new Date()

//handeling form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("weatherForm");
  const locationInput = document.getElementById("location-box");
  const weatherResult = document.getElementById("Weather-Condition");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const location = locationInput.value;

    try {
      // const response = await fetch(`/weather?location=${location}`, {
      //   method: "GET",
      // });
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7999ebbdf0964dc9943145145231310&q=${location}&day=2&aqi=no&alerts=no`)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.error){
        throw new Error("Couldn't fetch the location");
      }
      // Process and display the weather data on the frontend
      let dayCode = date.getDay();
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      document.getElementById("Day").innerHTML = `${days[dayCode]}`;
      //Setting date
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      document.getElementById("Date").innerHTML = `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
      // Setting weather
      WeatherElement.innerHTML = "";
      WeatherImageElement.innerHTML = "";
      let img = `<img src="${data.current.condition.icon}"></img>`;
      WeatherImageElement.insertAdjacentHTML("beforeend", img);

      WeatherElement.insertAdjacentHTML(
        "beforeend",
        `${data.current.condition.text}`
      );

      let Wind = `${data.current.wind_kph} Km/h`;
      WindElement.innerHTML = Wind;

      let Temp = `${data.current.temp_c}°C`;
      TempElement.innerHTML = `${Temp}`;

      let humidity = `${data.current.humidity}%`;
      humidityElement.innerHTML = `${humidity}`;

      let precipitation = `${data.current.precip_mm} mm `;
      precipitationElement.innerHTML = `${precipitation}`;
      // Setting location
      locationElement.innerHTML = `${data.location.name},${data.location.country}`;


      //Setting location box to nill
      box.value = ""
      box.placeholder = `Enter location`
    } catch (error) {
      // Handle any errors
      box.value = ""
      box.placeholder = `Couldn't find location "${location}"`
    }
  });
});
