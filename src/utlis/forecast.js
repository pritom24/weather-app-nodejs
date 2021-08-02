const request = require("request");
const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherapi.com/v1/forecast.json?key=6290a8b15346459c8ba135748210907&q=" +
    lat +
    "," +
    long +
    "&days=1&aqi=no&alerts=no";
  request({ url, json: true }, (error, { body }) => {
    const temp = body.current.temp_c;
    const rain = body.forecast.forecastday[0].hour[0].chance_of_rain;
    const icon = body.current.condition.text;

    if (error) {
      callback("unable to connect weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${icon}. Current tempareture ${temp} degress out. There are ${rain}% chance of rain `
      );
    }
  });
};

module.exports = forecast;
