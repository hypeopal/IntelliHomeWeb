import axios from "axios";
import {weatherKey} from "../../global";

export async function getCityId(city) {
    try {
        const response = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${city}&key=${weatherKey}`);
        //console.log(response.data);
        return response.data.location[0].id;
    } catch (error) {
        console.log(error);
    }
}

export async function getTemp(cityId) {
    try {
        const response = await axios.get(`https://devapi.qweather.com/v7/weather/7d?location=${cityId}&key=${weatherKey}`);
        let weather7d = response.data.daily.slice(0, 7).map(day => [day.tempMax, day.tempMin]);

        //return response.data;
        console.log(weather7d);
        return weather7d;
    } catch (error) {
        console.log(error);
    }
}
