const key= import.meta.env.VITE_WEATHERAPI_API_KEY;
const apiURL=`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=Santos&days=1&aqi=no&alerts=no`
console.log(apiURL);
