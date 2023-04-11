import React, {useEffect} from 'react';
import axios from 'axios';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import CurrentCondition from '../model/CurrentCondition';
import ForecastDay from '../model/ForecastDay';
import HourlyWeather from '../model/HourlyWeather';
import hourlyWeather from '../model/HourlyWeather';

function GetForecastDay() {
  const [forecastDay, setForecastDay] = React.useState<ForecastDay>();
  const hourlyForecastArr: HourlyWeather[] = [];
  const [hourlyForecast, setHourlyForecast] = React.useState<HourlyWeather[]>();

  const latLong = GetCurrentLocation();
  useEffect(() => {
    latLong != undefined ? fetchData(latLong) : null;
  }, [latLong]);

  const fetchData = async (latLong: LocationData | undefined) => {
    await axios
      .get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${latLong?.latitude},${latLong?.longitude}`,
          lang: 'vi',
          days: '7',
        },
      })
      .then(response => {
        setForecastDay({
          maxTemp_c: Math.round(
            parseInt(response.data.forecast.forecastday[0].day.maxtemp_c),
          ),
          minTemp_c: parseInt(
            response.data.forecast.forecastday[0].day.mintemp_c,
          ),
        });
        response.data.forecast.forecastday[0].hour.map(a => {
          hourlyForecastArr.push({
            time: a.time,
            temp_c: a.temp_c,
            condition_code: a.condition.code,
            is_day: a.is_day,
          });
        });
        setHourlyForecast(hourlyForecastArr);
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };

  return [forecastDay, hourlyForecast];
}
export default GetForecastDay;
