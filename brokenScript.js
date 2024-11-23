const fetch = require("node-fetch");
// API Key
const apikey = "bf8755493a92eb08974e3974b0a725de";

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  try {
    console.log(`City: ${city}`);

    // fetch weather data
    const response = fetch(apiUrl);

    // handling response error
    if (!response.ok) {
      throw new Error(`Not able to fetch data`);
    }
    // parse the json response
    const data = await response.json();

    // checking if data contains valid information
    if (!data.main || !data.weather || data.weather.length === 0) {
      throw new Error("Weather data is incomplete");
    }

    const weatherDetails = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[10].description,
    };
    console.log("Weather Details:", weatherDetails);
  } catch (error) {
    console.error(error.message);
  }
}
getWeatherData("Calgary");
