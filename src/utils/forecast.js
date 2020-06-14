//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')
const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=6a891dcf3d995828c03268e4c882bf59&query=' + latitude + ',' + longitude
  console.log(url);
  
  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback("Unable to connect to weather service", undefined)
    } else if(body.error){
      callback("Unable to find loacation", undefined)
    } else{
      // callback(undefined, {
      //   temperature: body.current.temperature,
      //   precip: body.current.precip,
      // })
      callback(undefined, "It's currently " + body.current.temperature + " degrees out. There is " + body.current.precip + "% chance of rain.")
    }
  })
}

module.exports = forecast

