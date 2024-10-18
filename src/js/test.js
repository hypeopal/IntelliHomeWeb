const weatherKey = '374e1edbaddf4559a1ba40aae70acd1f';
const axios = require('axios');

async function getCityId(city) {
    try {
        const response = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${city}&key=${weatherKey}`);
        //console.log(response.data);
        return response.data.location[0].id;
    } catch (error) {
        console.log(error);
    }
}

async function getTemp(cityId) {
    try {
        const response = await axios.get(`https://devapi.qweather.com/v7/weather/7d?location=${cityId}&key=${weatherKey}`);
        let weather7dHigh = response.data.daily.slice(0, 7).map(day => [day.tempMax, day.tempMin]);

        //return response.data; //TODO: 解析json，返回天气信息
        console.log(weather7dHigh);
    } catch (error) {
        console.log(error);
    }
}

getCityId("chengdu")
    .then(cityId => {
        if (cityId) {
            return getTemp(cityId);
        } else {
            console.log("无法获取城市ID");
        }
    })
    .catch(error => {
        console.log(error);
    });

