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
    const rain = body.current.precip_in;

    if (error) {
      callback("unable to connect weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `current tempareture ${temp} out there chance of rain ${rain}%`
      );
    }
  });
};

module.exports = forecast;
