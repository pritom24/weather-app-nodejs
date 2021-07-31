const request = require("request");

const geoCoding = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicHJpdG9tMjQiLCJhIjoiY2txdGxsdzBkMGRvcTJ1c2JwandyeGU4aCJ9.CUfOu9vHcRF9ivGT9i2-0w";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find the location try another search ", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCoding;
